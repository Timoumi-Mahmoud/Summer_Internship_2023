const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../app');
const usersID=require('./manageUsersTests/registerationProcess.test')
const userSchema=require('../modeles/user')
const offerSchema=require('../modeles/user')

const cleanUp = () =>{

describe("DELETE user/:id", () => {
    it("should clear Database from all  users that been created for test ", async () => {

//      await userSchema.findOneAndDelete({email:'mahmoud.timoumi666@gmail.com'})
      await userSchema.findOneAndDelete({email:'admin@gmail.com'})      
      await offerSchema.findOneAndDelete({title:'TEST Title'})      

      // for(let i=0;i<usersID.length;i++){
        //     var res = await request(app).delete(
        //         '/users/'+usersID[i]
        //        );
        // }
     
  
     // expect(res.statusCode).toBe(202);
    });
  });

}


module.exports=cleanUp
