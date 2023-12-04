const mongoose=require('mongoose')
const userSchema=require('./user')
const Schema = mongoose.Schema;
const applicationService=require('../services/applicationService/applicationService')
const studentAdditionalInfoSchema= new mongoose.Schema({

    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' },
    identifier:{
        type: String
    },
    studentFullName:{type:String},
    studentMail:{type:String},
    studentBirthDate:{type:Date},
    totalScore:{type: Number},

    GradeBac:{
        type: Number
    },
    GradeFirstYear:{
        type: Number
    },
    GradeSecondYear:{
        type: Number
    },
    GradeThirdYear:{
        type: Number
    }, 

})


studentAdditionalInfoSchema.pre('save', function(next){
  console.log(this.GradeFirstYear)
  this.totalScore=this.GradeFirstYear+this.GradeSecondYear+this.GradeThirdYear/0.5
  console.log(this.totalScore)
    next();   
 });
module.exports=mongoose.model('studentAdditionalInfoSchema', studentAdditionalInfoSchema);
