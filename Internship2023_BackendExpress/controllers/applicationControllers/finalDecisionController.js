
const finalDecisionService=require('../../services/applicationService/finalDecisionService')
const CustomAPIError =require('../../errors/custom-error')

 const finalDecisionAboutAnApplication=async(req,res)=>{
    const decision=req.query.decision
    const applicationId=req.query.applicationId;
    try {
     const app=  await   finalDecisionService.setApplicationResult(applicationId, decision)
       res.status(200).json(app)
    } catch (error) {
    throw new CustomAPIError('An error occured ', 500)
    }
}



module.exports={ finalDecisionAboutAnApplication}


