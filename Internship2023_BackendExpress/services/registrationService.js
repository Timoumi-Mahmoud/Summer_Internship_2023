const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema =require('../modeles/user')


exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };

exports.findUserByEmail= async(email)=>{
   return await userSchema.findOne({email:email});
}

exports.createNewUser= async(user)=>{
    return await userSchema.create(user)
}

