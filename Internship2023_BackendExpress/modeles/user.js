const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
       // required:[true, 'must provide firstName'],
        trim:true,
        maxlength:[10 , 'firstName can not be more than 10 characters'],
    },

    lastName:{
      type:String,
      //required:[true, 'must provide lastName'],
      trim:true,
      maxlength:[10 , 'firstName can not be more than 10 characters'],
  },
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      },
      password: { type: String },
      address:{type:String},

      resetPassword: { type: String , default:""},
      birthDate:{
        type:Date
      },

      isActive:{type: Number,
        default:0
      },
      phoneNumber:{
        type:Number,
        maxlength:[8 , 'phone number can not be more than 8 digits'],
        minlength:[8 , 'phone number can not be less than 8 digits'],
      },
      gender:{
        type: String,
      enum:{
        values: ['Male', 'Female'],
        message: '{value} is not supported'} 
      },
      
      department:{
        type: String,
      enum:{
        values: ['TIC', 'EM'],
        message: '{value} is not supported'} 
      },
	address:{
		type:String,
	}
	,
      role:{
        type: String,
        default:'USER',
      enum:{
        values: ['ADMIN', 'USER'],
        message: '{value} is not supported'} 
      },
      profile_img: String,
      cloudinary_id: String,
      bookmarked: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
})




module.exports=mongoose.model('userSchema', UserSchema);

