const CustomAPIError=require('../../errors/custom-error')
const claimsService=require('../../services/claimService/claimsService')

const sendClaim=async(req,res)=>{
    let adminMail=req.query.adminMail
    let senderMail=req.query.senderMail
let body=req.body
    try {
        await claimsService.sendClaimMail( body)
        res.status(200).json({msg:'ok'})
    } catch (error) {
        throw new CustomAPIError('error while trying to send the claim mail ',400)
    }
}


module.exports=sendClaim