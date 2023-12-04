const CustomAPIError=require('../../errors/custom-error')
const applicationSchema =require('../../modeles/application')
const studentAdditionalInfoSchema = require('../../modeles/studentAdditionalInfo');

   exports.checkIfInfoExistInDB=async(id)=>{
      const studentInDB=  await studentAdditionalInfoSchema.findOne({identifier:id})
      if(studentInDB===null){
         return false;
      }else{
         return true;
      }
   }

   exports.getAddtionalDataID=async(id)=>{
      console.log('identifier in service::::=> '+ id)
    const additionalInfo=   await studentAdditionalInfoSchema.findOne({identifier:id});
   // const additionalInfo=   await studentAdditionalInfoSchema.findOne({identifier:'ECR4444458kdidn'});

      console.log('this is the additonal info'+ additionalInfo)
      return additionalInfo;

   }
   



   exports.findAllApplicationOfAstudent=async(idUser)=>{
       return await applicationSchema.find({user:idUser}).populate('offer').populate('studentAdditionalInfo')
   }

   exports.getAllApplicationOfAnOffer=async(id)=>{
      return  await applicationSchema
      .find({offer:id}).populate('user').populate('studentAdditionalInfo')
   }

   exports.getAllApplicationOfAnOfferBasedOnStatus=async(offerID, Status)=>{
      console.log(Status)
      if(Status==='All'){
         return await applicationSchema.find({offer:offerID})
      .populate('user').populate('studentAdditionalInfo');
      }
      return await applicationSchema.find({offer:offerID, applicationStatus: Status})
      .populate('user').populate('studentAdditionalInfo');
     
   }
