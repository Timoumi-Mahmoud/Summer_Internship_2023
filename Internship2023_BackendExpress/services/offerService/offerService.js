const Offer = require("../../modeles/offer");
const CustomAPIError =require('../../errors/custom-error')
const cloudinary=require('../../utils/cloudinaryConfig')

 
exports.getAllOffers = async () => {
  return await Offer.find();
};
 
exports.getOfferById = async (id) => {
    return await Offer.findById(id);
  };

exports.updateOffer = async (id, offer) => {
     return await Offer.findByIdAndUpdate(id, offer);
   };
  
  exports.deleteOffer = async (id) => {
    //await Bookmarked.findOneAndDelete({idOffer:id})
    
    const offer= await Offer.findByIdAndDelete(id);
    if( offer && offer.cloudinary_id !==''){
      await cloudinary.uploader.destroy(offer.cloudinary_id);
    }
    return offer
  };

 exports.searchOffer= async (univeristyName, targetClasses, country)=>{
    if(univeristyName===''){
      univeristyName=undefined
    }
    if(country===''){
      country=undefined
    }
    if(targetClasses===''){
      targetClasses=undefined
    }

    if(univeristyName ==undefined &&targetClasses!==undefined && country!==undefined ){
      var offer= await Offer.find({
        
        $or: [
          {targetClasses: targetClasses},
          {country : country }]
        });
    }
    else if(univeristyName ==undefined && targetClasses ==undefined && country!== undefined ){
      var offer= await Offer.find({country: country})
    }else if(country ==undefined && univeristyName ==undefined  && targetClasses !==undefined){
      var offer= await Offer.find({targetClasses: {$regex: targetClasses, $options: 'i'}})

    }else if( targetClasses ==undefined && country===undefined){
      console.log("\n here"+univeristyName)
      var offer= await Offer.find({universityName: {$regex: univeristyName, $options: 'i'}})
    }
    else if(country === undefined){
      var offer=await  Offer.find({
        $or: [
            {targetClasses: targetClasses},
             {univeristyName: {$regex: univeristyName, $options: 'i'}},
            ]
          });
    }
    else{
          var offer=await  Offer.find({
         $or: [
             {targetClasses: targetClasses},
             {univeristyName: {$regex: univeristyName, $options: 'i'}},
             {country : country }]
           });
    }
     return offer;

 }




