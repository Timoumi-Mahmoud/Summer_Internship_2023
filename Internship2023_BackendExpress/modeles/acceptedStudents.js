const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const AcceptedSchema= new mongoose.Schema({


    applicationID: { type: mongoose.Schema.Types.ObjectId, ref: 'applicationSchema'},
    acceptedAt:{type: Date, default: Date.now} ,


})

module.exports=mongoose.model('AcceptedSchema', AcceptedSchema);
