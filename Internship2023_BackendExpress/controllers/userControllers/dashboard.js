require('dotenv').config()
const { json } = require('express')
const CustomAPIError=require('../../errors/custom-error')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const getDashbord =async(req,res)=>{
// console.log(req.user)
    const luckyNumber=Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello ${req.user.email}  `, secret:`Here is your secret data
    ${luckyNumber}` })

    }

    module.exports={getDashbord}