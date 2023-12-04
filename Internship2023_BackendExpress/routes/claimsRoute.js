const express=require('express')
const path = require("path");
const router =express.Router()


const sendClaim=require('../controllers/claimsControllers/sendClaims')


router.route('/sendClaim').post(sendClaim)

module.exports=router