const express=require('express')
const path = require("path");
const router =express.Router()
// const cloudinary = require('../utils/cloudinaryConfig');
 const upload = require("../utils/multer");
const { createNewAccount, activateAccount, sendActivationAccountEmail}= require('../controllers/userControllers/registration')
const { login}= require('../controllers/userControllers/login')
const { getDashbord}= require('../controllers/userControllers/dashboard')
const {userList, deleteUser, updateUser,getUser, blockUser, searchUser, filterUserBasedOnDepartment }= require('../controllers/userControllers/userCrud')
const changePassword=require('../controllers/userControllers/ForgetPasswordControllers/forgetPassword')
const sendResetPasswordLink=require('../controllers/userControllers/ForgetPasswordControllers/sendResetPasswordLink')
const authenticationMiddleware=require('../middleware/auth')
const authorizationMiddleware=require('../middleware/authorization')

const { get } = require('http');
/*****UserModule*****/
router.route('/userList').get(userList)
router.route('/user').get(searchUser)
router.route('/user/department').get(filterUserBasedOnDepartment)



router.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/users/blockUser/:id').put(blockUser)
router.route('/dashboard').get(  authorizationMiddleware('ADMIN'),getDashbord)
router.route('/register').post(upload.single("image"), createNewAccount)
router.route('/sendActivationAccountEmail/:email').post(sendActivationAccountEmail)
router.route('/activateAccount').put(activateAccount)
router.route('/login').post(login)
router.route('/changePassword').patch(changePassword)
router.route('/sendResetPasswordLink').post(sendResetPasswordLink)


module.exports=router
