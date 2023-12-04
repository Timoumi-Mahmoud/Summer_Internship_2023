const CustomAPIError=require('../../errors/custom-error')
const registrationService= require('../../services/registrationService')
const activateAccountService= require('../../services/emailService/activateAccountService')
const userSchema =require('../../modeles/user')
const cloudinary = require('../../utils/cloudinaryConfig');
const upload = require("../../utils/multer");

const createNewAccount=  async (req, res)=>{
    try {
       const { password, email}=req.body

       console.log(req.body)
       const userExist= await registrationService.findUserByEmail(email)
       const hashedPassword = await registrationService.hashPassword(password)
       if(req.file){
           var result = await cloudinary.uploader.upload(req.file.path);
           var profileImageUrl=result.secure_url
           var cloudinary_public_id=result.public_id
       }else {
        const result=null
        var profileImageUrl=''
        var cloudinary_public_id=''
       }
    
       let user = new userSchema({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        department:req.body.department,
        phoneNumber:req.body.phoneNumber,
        gender: req.body.gender,
        address:req.body.address,
        birthDate:req.body.birthDate,
        role: req.body.role,
        isActive:req.body.isActive |'', 
       profile_img: profileImageUrl ,
       cloudinary_id: cloudinary_public_id,
      });
      await user.save();
       res.status(201).json({msg:"user registered succussfully"})
    } catch (error) {
      console.log(error)
        if(error.code=== 11000){
            throw new CustomAPIError('email address already in use', 400)
        }   
    } }
    
    const sendActivationAccountEmail= async (req,res)=>{
      const email =req.params.email
      try {
        const acivateAccountEmail= await activateAccountService.sendEmail(email)
        res.status(201).json({msg:"Email sent  succussfully"})
      } catch (error) {
       throw new CustomAPIError('problem while sending the verification mail', 400)

      }
    }

    const activateAccount =async(req,res)=>{
        try {
          const activatedUser= await activateAccountService.activateAccount(req.query.email)
          res.status(200).json({msg: 'updated', activatedUser})
        } catch (error) {
          throw new CustomAPIError('problem in activating the account', 400)
        }
    }
    module.exports={createNewAccount, activateAccount, sendActivationAccountEmail}


