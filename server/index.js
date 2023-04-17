const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("./nodemailer");
const {sendResetPasswordEmail} = require("./nodemailer");




const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const JWT_SECRET = "fkhhjbehrrufrfrjkfjkf7633EF8F4U88R040_rhrjfiorjifjirfz"

const mongoUrl = "mongodb+srv://mariemaissa:mariemaissa123@cluster0.5aozken.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, { 
  useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => console.error(err));


require("./userDetails");
const User = mongoose.model("UserInfo");
app.use(express.json());

app.post("/register", async (req, res) => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += characters[Math.floor(Math.random() * characters.length)];
  }

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    activationCode: activationCode,
  });
  
  try {
    await user.save();
    sendEmail(user.email, user.activationCode);
    res.send({ message: "profile created !" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


app.post("/login", async (req, res) => {
  const {email, password} =req.body;
  if (!email || !password) {
    return res.send({
      error: "user or password not found",
    });
  }
  const user = await User.findOne({ email : email});
  
  if (!user) {
    return res.json({ error: "User Not found" });
  }else if(user.isActive == false) {
    return res.send({
      error: "this account is not activated! Please check your email",
    });
  }
  else {
    if (await user.comparePassword(password)){
      const token = jwt.sign({email: user.email}, JWT_SECRET);
        if (res.status(201)) { 
        return res.json({status: "ok", data: token})
      };
    }else {
      return res.send({ error: "Verify your password !" });
    }
    
  } 
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.error(error);
    res.status(401).send({ status: "error", data: error.message });
  }
});

app.delete("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});


app.put("/update", async (req, res) => {
  
  const { token, fname, lname, email } = req.body;
  console.log(req.body);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    const updatedUser = await User.findOneAndUpdate({email: userEmail}, { fname, lname, email }, { new: true });
    res.send({ status: "ok", data: updatedUser });
    console.log(updatedUser.email);
  } catch (error) {
    console.error(error);
    res.status(401).send({ status: "error", data: error.message });
  }
});




app.post("/reset_password", async (req, res) => {
  function generateRandomCode() {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const randomCode = generateRandomCode();
  await User.findOneAndUpdate(
    { email: req.body.email },
    {
      new: true,
    }
  ).then((user) => {
    if (user) {
      user.resetCode = randomCode;
      user.save();
      console.log(user.email);
      sendResetPasswordEmail(req.body.email, randomCode);
      res.send({ msg: "reset email sent successfully" });
    } else {
      res.send({ err: "no account is associated with this email" });
    }
  });
});

app.post("/verifUser", async (req, res) => {
  const { activationCode } = req.body;

  User.findOne({ activationCode }).then((user) => {
    if (!user) {
      res.send({
        message: "Activation code is invalid!",
      });
    }
    user.isActive = true;
    user.save();
    res.send({ message: "This account is activated! Welcome to our application" });
  });
});



app.get("/getUser", async(req, res) =>{
  try {
    const allUser = await User.find({})
    res.send({status: "ok", data:allUser });
  } catch (error) {
    console.log(error);
    
  }
});

app.post('/NewPassword', async (req,res) => {
  const { password, Newpassword } = req.body ;
  console.log(password, Newpassword);


})


app.post('/ChangePassword', async (req, res) => {
  const { code, password } = req.body;
  console.log(code, password);

    const user = await User.findOne({ resetCode: code });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }else{const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetCode = '';
  
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });}
    
});

app.post("/informations" ,async (req,res) => {
   const {token} =req.token;
   const user = User.find({token : token});

});
app.get(("/verifUser/:activationCode") ,async (req,res) => {
  User.findOne({activationCode : req.params.activationCode}).then((user) => {
    if(!user){
      res.send({
        message: "Code activation is false !",
      });
    }
    user.isActive = true;
    user.save();
    res.redirect('exp://192.168.1.13:19000');

  })
});
require("./ratings");
const Rating = mongoose.model("Rating");
app.post('/ratings', (req, res) => {
  const { user, rating } = req.body;
  const newRating = new Rating({ user, rating });
  newRating.save()
    .then(() => res.status(201).send('Rating saved'))
    .catch(err => res.status(400).send(err));
});

require("./category");
const {Category}=require('./category');
app.get(`/GetCategory`,async(req,res)=>{
  const categoryList=await Category.find();
  if(!categoryList){
   res.status(500).json({success:false})
  }
  res.status(200).send(categoryList);
 })
app.post(`/Category`,async(req,res)=>{
  let category=new Category({
    name:req.body.name,
  })
 category=await category.save();
 if(!category)
 return res.status(400).send('the category cannot be created!')
 res.send(category); });
app.put('/Category',async(req,res)=>{
  const category=await Category.findByIdAndUpdate(req.params.id,{
    name:req.body.name
  },{
    new:true
  })
  if(!category)
return res.status(400).send('the category cannot be created!')
res.send(category);

 })
app.delete('/Category',(req,res)=>{
  Category.findByIdAndRemove(req.params.id).then(category=>{
    if(category){
      return res.status(200).json({success:true,message:'the category is deleted'})
    }else{
      return res.status(404).json({success:false,message:'category not found'})
    }
  }).catch(err=>{
    return res.status(400).json({success:false,error:err})
  })
 })

 
const { Exchange } = require('./exchange')
require("./exchange");
app.get('/exchange', async (req, res) => {
  try {
    const exchangeList = await Exchange.find();
    res.status(200).json(exchangeList);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
});
app.post('/exchange', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid user' });
    }

    const exchange = new Exchange({
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
      location: req.body.location,
      userId: req.body.userId,
      status:req.body.status
    });

    const savedExchange = await exchange.save();

    // Send notification to user
    user.notifications.push(`You received a new exchange request for ${req.body.name}`);
    await user.save();

    res.status(201).json(savedExchange);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
});
app.put('/exchange', async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) {
      return res.status(404).json({ success: false, message: 'Exchange not found' });
    }

    exchange.status = req.body.status;
    const updatedExchange = await exchange.save();

    res.status(200).json(updatedExchange);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
});

require("./fourniture");
const {Fourniture}=require('./fourniture');
app.get('/Fourniture', async (req, res) => {
  const location = req.query.location;
  const category = req.query.category;

  let filter = {};
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }

  try {
    const fournitureList = await Fourniture.find(filter);
    if (fournitureList.length === 0) {
      return res.status(404).json({ success: false, message: 'No furniture found' });
    }
    res.status(200).json(fournitureList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});
app.get('/IdFourniture', async(req, res) => {
  try {
    const fourniture = await Fourniture.findById(req.params.id);
    if (fourniture) {
      return res.status(200).json({ success: true, message: 'the fourniture is founded' });
    } else {
      return res.status(404).json({ success: false, message: 'fourniture not found' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/Fourniture', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    if (!req.body.name || !req.body.availability || !req.body.description || !req.body.category || !req.body.token) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const { token } = req.body;
   
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const userEmail = decoded.email;

    User.findOne({ email: userEmail })
      .then(async (user) => {
        if (!user) {
          return res.status(400).json({ success: false, message: 'User not found' });
        }

        let fourniture = new Fourniture({
          name: req.body.name,
          availability: req.body.availability,
          description: req.body.description,
          category: req.body.category,
          user: userEmail,
        });

        fourniture = await fourniture.save();
        if (!fourniture) {
          return res.status(500).json({ success: false, message: 'Failed to create the furniture item' });
        }

        res.status(200).json(fourniture);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create the furniture item', error: error.message });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create the furniture item', error: err.message });
  }
});



app.put('/Fourniture', async (req, res) => {
  const fourniture = await Fourniture.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      location: req.body.location,
      availability: req.body.availability,
      description: req.body.description,
      isFeatured: req.body.isFeatured,
      category: req.body.category,
    },
    { new: true }
  );
  if (!fourniture) {
    return res.status(400).json({ success: false, message: 'The furniture item cannot be updated!' });
  }
  res.status(200).json(fourniture);
});
app.delete('/Fourniture', async (req, res) => {
  try {
    const fourniture = await Fourniture.findByIdAndRemove(req.params.id);
    if (fourniture) {
      return res.status(200).json({ success: true, message: 'The furniture item is deleted' });
    } else {
      return res.status(404).json({ success: false, message: 'Furniture item not found' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});



require("./notification");
const { Notification } = require('./notification');
app.get('/Notification', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.post('/Notification', async (req, res) => {
  try {
    const recipient = await User.findById(req.body.recipient);
    if (!recipient) {
      return res.status(400).json({ success: false, message: 'Invalid recipient' });
    }
    const notification = new Notification({
      recipient: recipient._id,
      message: req.body.message,
      createdAt:req.body.createdAt
    });
    const savedNotification = await notification.save();
    return res.status(201).json(savedNotification);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.delete('/Notification', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndRemove(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    return res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
