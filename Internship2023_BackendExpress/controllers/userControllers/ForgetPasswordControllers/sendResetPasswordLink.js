
const CustomAPIError=require('../../../errors/custom-error')
const passwordService= require('../../../services/emailService/forgetPasswordService')
const userSchema =require('../../../modeles/user')
const uuid = require('uuid');



const sendResetPasswordLink= async (req,res)=>{
    const email =req.query.email
    try {
      const user= await userSchema.findOne({email});
      const userId=user._id
      const resetPwdToken= id=uuid.v1() 
    //  await userSchema.findOneAndUpdate({_id:userId},{resetPassword:  resetPwdToken   })
      await passwordService.setForgetPasswordTokenProperty(userId, resetPwdToken)
      await passwordService.sendForgetPasswordToken(email, resetPwdToken)
      res.status(201).json({msg:"Email sent  succusfuly", pwdResetToken: resetPwdToken})
    } catch (error) {
     console.log(error)
      throw new CustomAPIError('probleme in sending verification email', 400)

    }
  }

  module.exports=sendResetPasswordLink