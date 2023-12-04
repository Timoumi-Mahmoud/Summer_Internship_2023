const loginService=require('../../services/loginService')
const {BadRequestError}=require('../../errors')
const {UnauthenticatedError}=require('../../errors')
 

const login = async (req, res)=>{
    const {email, password}=req.body
    const userInDB= await loginService.findUserByEmail(email)
    const id=userInDB._id
    if(userInDB.isActive===0){
        throw new UnauthenticatedError('your account not active, please activate your account ')
    }
    const roleOfCurrentUser=userInDB.role
    const username=userInDB.firstName + userInDB.lastName
    if(userInDB){
        const passwordInDB=userInDB.password
        const isPasswordCorrect = await loginService.verifyPassword(password, passwordInDB);
        if(isPasswordCorrect ===true ){
            const decoded= loginService.generateToken(email,roleOfCurrentUser).decoded
            const token=loginService.generateToken(email,roleOfCurrentUser).token
            res.status(200).json({msg:'correct crediantial', decoded,token, roleOfCurrentUser, id})
        }else{
        throw new BadRequestError('password or useruname is uncorrect ')
        }
    }
  
}



module.exports={login}

