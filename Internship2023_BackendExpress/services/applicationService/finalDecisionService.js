//const { finalDecisionAboutAnApplication } = require('../../controllers/applicationControllers/finalDecisionController')
const applicationSchema=require('../../modeles/application')
const Offer= require('../../modeles/offer')
const CustomAPIError =require('../../errors/custom-error')
const AcceptedSchema=require('../../modeles/acceptedStudents')
const applicationStatusEmails=require('./applicationStatusEmails')

sendNotificationEmail=async(studentMail, status, offerId)=>{
    await applicationStatusEmails.sendAcceptanceEmail(studentMail, status, offerId)
}

exports.setApplicationResult=async(applicationId, decision)=>{
    const app= await applicationSchema.
        findOneAndUpdate({_id:applicationId},
            {applicationStatus: decision})
      console.log(app)
     checkTheFinalResult(decision, app.offer, applicationId,app.mailAddress )
    return app
}

 checkTheFinalResult= async(decision , offerId, applicationID, studentEmail)=>{
    if(decision==='Accepted'){
        await updateNbreOfFreePlacesInAnOffer(offerId);
        await addToAcceptedList(applicationID)
    }
    await sendNotificationEmail(studentEmail, decision ,offerId)
}

updateNbreOfFreePlacesInAnOffer=async(offerId)=>{
   try {
    const offer= await Offer.
    findOneAndUpdate({_id:offerId}, {$inc: {numberOfplaces: -1}}
        ,   { arrayFilters: [ { numberOfplaces: { $gte: 0 } } ] }
        )
        console.log(" \n here the offer is ====================>",offer)
         return offer
   } catch (error) {
    throw new CustomAPIError('number Of places is full', 500)
    
   }
}
addToAcceptedList=async(applicationID)=>{
    return await AcceptedSchema.create({applicationID: applicationID})
}




