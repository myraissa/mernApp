const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
  
    },
    lname: {
      type: String,
      required: true,
     
    },
    email: {
      type: String,
      unique: true,
      required: true,
      unique : true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "UserInfo",
    timestamps: true,
  }
);



const User = mongoose.model("UserInfo", UserDetailsSchema);

module.exports = User;
