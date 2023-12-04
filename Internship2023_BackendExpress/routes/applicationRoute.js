const express=require('express')
const path = require("path");
const router =express.Router()
// const { getDashbord, createNewAccount, login}= require('../controllers/main')
const { finalDecisionAboutAnApplication}= require('../controllers/applicationControllers/finalDecisionController')
const cloudinary = require('../utils/cloudinaryConfig');
const upload = require("../utils/multer");

const {  getStudentInfoBasedOnIdentifier, submitApplication , getAllApplicationOfAStudent}=require('../controllers/applicationControllers/application')

const{getAllApplicationOfAnOffer, getAllApplicationOfAnOfferBasedOnStatus}=require('../controllers/applicationControllers/ManageApplication')
const exportExcel=require('../controllers/applicationControllers/exportApp')




router.route('/additionalInfo').get(getStudentInfoBasedOnIdentifier)
router.route('/submitApplication').post(upload.single("file"),submitApplication)
router.route('/getAllApplicationOfAStudent/:idUser').get(getAllApplicationOfAStudent)


 router.route('/getAllApplicationOfAnOffer').get(getAllApplicationOfAnOffer)
 router.route('/getAllApplicationOfAnOfferBasedOnStatus').get(getAllApplicationOfAnOfferBasedOnStatus)





router.route('/finalDecisionAboutAnApplication').patch(finalDecisionAboutAnApplication)
// router.route('/updateFreePlacesNbre').patch(updateFreePlacesNbre)

router.route('/getExcel').get(exportExcel)


module.exports=router
