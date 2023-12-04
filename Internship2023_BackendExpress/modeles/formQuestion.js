const mongoose=require('mongoose')
const QuestionSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'must provide a title'],
        trim:true,
        minlength:[10 , 'title can not be less than 10 characters'],
    },
    questionContent:{
        type:String,
        required:[true, 'must provide a question'],
    },
    updatedAt  :  { type: Date, default: Date.now },
    replay: [{ type: Schema.Types.ObjectId, ref: "ReplaySchema" }],

})



module.exports=mongoose.model('QuestionSchema', QuestionSchema);
