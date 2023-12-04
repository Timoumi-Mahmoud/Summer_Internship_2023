const jwt = require('jsonwebtoken');
const CustomAPIError=require('../errors/custom-error')
const {UnauthenticatedError}=require('../errors')





const authenticationMiddleware =async(req,res, next)=>{
   console.log('\n hello form  middleware  Auth ----\n')
   
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith(`Bearer `)){
        throw new UnauthenticatedError('No token provided');
    }
     const token =authHeader.split(' ')[1]
    // console.log('token is :    '+ token)
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const {email, role}=decoded
        req.user={email,role}
        const connectedUser=decoded.role
        console.log(decoded)
       
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
   
    next()
}

module.exports=authenticationMiddleware