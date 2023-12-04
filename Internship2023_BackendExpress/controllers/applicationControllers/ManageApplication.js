const CustomAPIError=require('../../errors/custom-error')
const registrationService= require('../../services/registrationService')
const activateAccountService= require('../../services/emailService/activateAccountService')
const applicationSchema =require('../../modeles/application')
const cloudinary = require('../../utils/cloudinaryConfig');
const upload = require("../../utils/multer");
const sql=require('../../db/mysqlConnect');
const applicationService=require('../../services/applicationService/applicationService')

const getAllApplicationOfAnOffer=async(req,res)=>{
    const offerId=req.query.offerId
        try {
            const applications= await applicationService.getAllApplicationOfAnOffer(offerId);
            res.status(200).json(applications)
        } catch (error) {
            console.log(error)
        }
}

const getAllApplicationOfAnOfferBasedOnStatus=async(req,res)=>{
    const status=req.query.applicationStatus
    const offerId=req.query.offerId
    try {
        const applications=await applicationService.getAllApplicationOfAnOfferBasedOnStatus(offerId,status)
        res.status(200).json(applications)
    } catch (error) {
        console.log(error)
    }
}






module.exports={getAllApplicationOfAnOffer, getAllApplicationOfAnOfferBasedOnStatus}