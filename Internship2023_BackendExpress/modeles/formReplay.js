const mongoose=require('mongoose')
const ReplySchema= new mongoose.Schema({
    replyContent:{
        type:String,
        required:[true, 'must provide a title'],
        trim:true,
        minlength:[10 , 'title can not be less than 10 characters'],
    },
    updatedAt  :  { type: Date, default: Date.now },

})

module.exports=mongoose.model('ReplySchema', ReplaySchema);
