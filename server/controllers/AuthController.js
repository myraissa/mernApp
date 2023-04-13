const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { fname, lname, email, password } = req.body;
  
    try {
      const user = new User({ fname, lname, email, password });
      await user.save();
      console.log('User registered successfully:', user);
      return res.json({ success: true });
    } catch (err) {
      console.log('Error registering user:', err.message);
      
    }
  };
  

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Replace username with email
    const user = await User.findOne({ email: email }); // Use email to find user
    if (!user) {
      return res.json({ message: 'No user found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Password does not match!' });
    }
    const token = jwt.sign({ fname: user.fname }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      message: 'Login successful!',
      token,
    });
  } catch (err) {
    console.log('Error logging in user:', err);
    return res.status(500).send('Error logging in user');
  }
};


module.exports = {
  register,
  login,
};
