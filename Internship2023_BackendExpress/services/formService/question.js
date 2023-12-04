const QuestionSchema = require("../../modeles/formQuestion");
const CustomAPIError =require('../../errors/custom-error')


   
 
  
 
exports.getAllQuestion = async () => {
    return await QuestionSchema.find();
  };
   
exports.getQuestionById = async (id) => {
      return await QuestionSchema.findById(id).populate('Replay').exec;
    };
  
exports.updateQuestion = async (id, questionContent) => {
       return await QuestionSchema.findByIdAndUpdate(id, questionContent);
     };
    
exports.deleteAQuestion = async (id) => {      
      const Question= await QuestionSchema.findByIdAndDelete(id);
      return Question
    };

exports.replayToAQuestion= async(id)=>{
        //todo later
    }
  