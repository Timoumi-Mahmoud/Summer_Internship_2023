const userService=require('../../../services/userService')
const registrationService=require('../../../services/registrationService')
const passwordService= require('../../../services/emailService/forgetPasswordService')
const changePassword= async(req,res)=>{
    try {
    const token= req.query.token
    const newPassword=req.query.password
    const hashedNewPassword= await registrationService.hashPassword(newPassword)
    const user=await passwordService.findPasswordToken(token)
        if(user){
            const userId=user._id
            var updatedUser =await userService.resetPassword(userId,hashedNewPassword)
            var response=req.query
        }
    res.status(201).json({updatedUser})
        } catch (error) {
        console.log(error)
        }
}
module.exports=changePassword