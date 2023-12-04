const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');

forgetPwdTest=async()=>{
let pwdToken
describe('POST /sendResetPasswordLink?email=emailAddress' , ()=>{
    it('should not send reset pwd link because email doesnt exist in DB' , async()=>{
        const res=await request(app).post("/sendResetPasswordLink?email=fake.mail@fakeAZF.tn").send({
        })
        
       // console.log(res.body)
        expect(res.statusCode).toBe(400)
      })

    it('should send reset password link' , async()=>{
      const res=await request(app).post("/sendResetPasswordLink?email=mahmoud.timoumi@esprit.tn").send({
      })
      
     // console.log(res.body.pwdResetToken)
      pwdToken=res.body.pwdResetToken
      expect(res.body.pwdResetToken).toBeDefined()
      expect(res.statusCode).toBe(201)
    })   
  })

 

  describe('PATCH  /changePassword?token=4af...dfdf&password=newPWD', ()=>{
    it('User should be change its password ' , async()=>{
        const res=await request(app).patch('/changePassword?token='+pwdToken+'&password=1234567891011').send({

        })
        expect(res.statusCode).toBe(201)
      })
      it('User should be able to login with its new password  ' , async()=>{
        const res=await request(app).post("/login").send({
            email:'mahmoud.timoumi@esprit.tn',
            password:'1234567891011'
          })
          expect(res.statusCode).toBe(200)
          expect(res.body.token).toBeDefined()
        })
      })

    }


    module.exports=forgetPwdTest