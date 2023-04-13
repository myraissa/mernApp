const mongoose = require ("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        fname: String,
        lname:String,
        email: {type:String,unique:true},
        password: String,
        isActive :{
          type:   Boolean,
          default: false,
        },
        activationCode:String,
        resetCode: String,
        location:String,
    },
    {
        collection: "UserInfo" ,
    }
);
userSchema.methods.comparePassword = async function(password) {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
    } catch (err) {
      throw new Error(err);
    }
  }


const User = mongoose.model('UserInfo', userSchema);

module.exports = User;
