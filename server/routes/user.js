const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.log('Error getting users:', err);
    return res.status(500).send('Error getting users');
  }
});

module.exports = router;
