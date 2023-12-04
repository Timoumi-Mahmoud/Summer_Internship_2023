require('dotenv').config()
const { json } = require('express')
const userSchema =require('../modeles/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const uuid = require('uuid');

exports.findUserByEmail= async(email)=>{
    const user= await userSchema.findOne({email});
    return user;
}

exports.generateToken=(email,roleOfCurrentUser )=>{
    const tempUser=this.findUserByEmail(email)
    id=tempUser._id
    const token =jwt.sign({id, email, role:roleOfCurrentUser}, process.env.JWT_SECRET, {expiresIn:'30d'});
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    return {decoded, token};
}

exports.verifyPassword=async(password, passwordInDB) =>{ 
     return  await bcrypt.compare(password, passwordInDB);
    }
