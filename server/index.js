const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("./nodemailer");
const {sendResetPasswordEmail} = require("./nodemailer");
const Categorie = require("./Categories");
const SubCategorie = require("./SubCategories");



const app = express();
app.use(cors());


//const AuthRoute = require('./routes/auth')

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

//app.use('/api', AuthRoute);
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
require("./Categories");

require("./SubCategories");
app.post('/subcategories', async (req, res) => {
  try {
    const { name, image, description, categoryName } = req.body;
    // First check if the given category exists
    const category = await Categorie.findOne({ name : categoryName});
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const subcategory = new SubCategorie({ name, image, description, categoryName });
    await subcategory.save();
    res.json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


require("./items");
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
