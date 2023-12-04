const express=require('express')
const path = require("path");
const router =express.Router()
const cloudinary = require('../utils/cloudinaryConfig');
const upload = require("../utils/multer");
const authenticationMiddleware=require('../middleware/auth')
const{offerList,deleteOffer , updateOffer,getOffer, createNewOffer, searchOffer}=require('../controllers/offerControllers/offer')
const {bookmarkAnOffer, displayBookmarkedOffer, unbookmarkOffer}=require('../controllers/offerControllers/bookmarkOffer');
const { get } = require('http');
const authorizationMiddleware=require('../middleware/authorization')


router.route('/offer/:id').get(getOffer).put(updateOffer).delete( deleteOffer)
router.route('/offerList').get( offerList)
//router.route('/addOffer').post(authorizationMiddleware('ADMIN'),upload.single("image"), createNewOffer)
router.route('/addOffer').post(upload.single("image"), createNewOffer)

router.route('/searchOffer').get(searchOffer)
//Update an offer


router.route('/bookmark/:idOffer/:idUser').post(bookmarkAnOffer)
router.route('/bookmarkedList/:idUser').get(displayBookmarkedOffer)
router.route('/unbookmarkOffer/:idOffer/:idUser').put(unbookmarkOffer)


module.exports=router