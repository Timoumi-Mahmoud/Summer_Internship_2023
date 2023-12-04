const mongoose=require('mongoose')
const OfferSchema= new mongoose.Schema({
   
    universityName:{type: String},
    country: { type: String,
    enum:{
      values: ['France', 'United-states', 'United-Kingdom', 'Germany', 'Italy', 'Spain', 'Canada', 'Switzerland', 'Japan', 'Ireland', 'belgium' ]},
    },
    completeAddress:{type:String}, 
    mailAddress:{
      type: String,
        match: /.+\@.+\..+/,       
    },
    description:{
      type:String,
     // required:[true, 'must provide offer description'],
      trim:true,
    ///  maxlength:[50, 'description can not be more than 50 characters'],
  },
  targetClasses:{type: String},
  targetDepartment:{type: String},
  universityOfficialWebsite:{type:String},
 
  usefulLinks: {  type: String},


     numberOfplaces:{
        type:Number,
      },
    conditions:{type:String},
    score:{type: Number,  min: 0},
    publishDate  :  { type: Date, default: Date.now },
    deadlineDate:{type: Date },
    offer_img: String,
    cloudinary_id: String

})

module.exports=mongoose.model('Offer', OfferSchema);

