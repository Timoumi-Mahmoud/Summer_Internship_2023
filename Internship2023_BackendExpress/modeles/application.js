const mongoose=require('mongoose')

const calculateScoreService =require('../services/applicationService/calculateScoreService')
const applicationStatusEamils =require('../services/applicationService/applicationStatusEmails')

const Schema = mongoose.Schema;
const applicationSchema= new mongoose.Schema({
    studentAdditionalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'studentAdditionalInfoSchema' },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema', required: true },
    identifier:{
    type: String,
},
mailAddress:{type:String,
    match: /.+\@.+\..+/,
},
englishLevel:{type:String,
    enum:{
        values: ['A1', 'A2','B1','B2','C1','C2', 'I dont know'],
        message: '{value} is not supported'} 
},
currentClass:{type:String},
applicationStatus:{
    type: String,
     default:'Waiting',
        enum:{
        values:['Accepted', 'Rejected', 'Waiting', 'Waiting-list']
    }
},  
    applyedAt:{type: Date, default: Date.now} ,
    totalScore:{type: Number, default:0},
    applicationFile: String,
    cloudinary_id: String,
})

applicationSchema.pre('save',async  function(next){
 console.log(`totla score is ${this.totalScore}    and the english level is ${this.englishLevel} and the bac grade from the other table is ${this.studentAdditionalInfo.GradeFirstYear}`)
  
  this.totalScore= await calculateScoreService.calculateScore(this.studentAdditionalInfo.GradeBac, this.studentAdditionalInfo.GradeSecondYear,
    this.studentAdditionalInfo.GradeThirdYear, this.studentAdditionalInfo.GradeThirdYear, this.englishLevel )

console.log('offer Total Score is:    '+ this.offer.totalScore)
    this.applicationStatus=await calculateScoreService.makeInitialDecision(this.totalScore, this.offer)

    var offerID=this.offer
    var dateOfApplication = new Date(this.applyedAt).toLocaleDateString();
    console.log('The fucking DATE \t '+ dateOfApplication)

    await applicationStatusEamils.notifyTheStudentByTheStatusOfHisApplication(this.mailAddress, this.applicationStatus, offerID, dateOfApplication);

   next();   
});



module.exports=mongoose.model('applicationSchema', applicationSchema);

