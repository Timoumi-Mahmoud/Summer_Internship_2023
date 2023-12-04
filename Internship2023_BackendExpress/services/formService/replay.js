const ReplaySchema = require("../../modeles/formReplay");
const CustomAPIError =require('../../errors/custom-error')



exports.updateAReplay = async (id, replayContent) => {
    return await ReplaySchema.findByIdAndUpdate(id, replayContent);
  };
 
 exports.deleteAReplay = async (id) => {
   const replay= await ReplaySchema.findByIdAndDelete(id);
   return replay
 };
