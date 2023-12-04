const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');

 const sendClaimsTest = () =>{
describe('POST /sendClaim' , ()=>{
    it('should send an email to the admin' , async()=>{
        const res=await request(app).post("/sendClaim").send({
            subject:'This is a subject of test Reclmation',
            content:'This is the content of TEST Reclmation',
            senderEmail:'mahmoud.timoumi@esprit.tn',        
        })
        
       // console.log(res.body)
        expect(res.statusCode).toBe(200)
      })

  })

}


module.exports=sendClaimsTest