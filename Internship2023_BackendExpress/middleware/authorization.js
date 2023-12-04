const jwt = require('jsonwebtoken');
const CustomAPIError=require('../errors/custom-error')
const {UnauthorizedError }=require('../errors')
const { UnauthenticatedError}=require('../errors')


const authorizationMiddleware =  (roleArray) =>(req,res, next)=>{
    // console.log('\n middleware works \n', req.headers.authorization)
    //console.log('\n hello form  middleware  authorizationMiddleware ----\n')

   
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
        const connectedUserRole=decoded.role
        //console.log(decoded)
        if(roleArray != connectedUserRole){
            throw new UnauthenticatedError('Not authorized ')

        }
       
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
   
    next()
}

module.exports=authorizationMiddleware