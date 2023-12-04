const UserSchema = require("../../modeles/user");

exports.bookmardAnOffer=async(bookmarked, connectedUser)=>{
    await UserSchema.findOneAndUpdate({_id:connectedUser},{
    $addToSet: { bookmarked}})
}

exports.unbookmark=async( bookmarked, connectedUser)=>{
   await UserSchema.findOneAndUpdate({_id:connectedUser},{
      $pull: { bookmarked:bookmarked}})
}

exports.getListOfOffers=async(idUser)=>{
   return   await UserSchema.find({_id:idUser}).select('_id').populate('bookmarked')
}





