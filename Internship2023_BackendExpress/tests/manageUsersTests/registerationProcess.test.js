const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');
require("dotenv").config();


let usersID=[]

const registerTests = () =>{
describe("POST /register", () => {
    it("should create a new user with Student Role", async () => {
      const res = await request(app).post("/register").send({
        email:'mahmoud.timoumi666@gmail.com',
        password:'000000',
        firstName:'Tim Test',
        lastName:'tim Test',
        role:'USER',
       // isActive:1 
      });
   // const usersCredentialSimpleUser=new usersCredential('simpleUser@gmail.com','000000')
      expect(res.statusCode).toBe(201);
    });
  });
  
  describe("POST /register", () => {
    it("should create a new user with ADMIN role", async () => {
      const res = await request(app).post("/register").send({
        email:'admin@gmail.com',
        password:'000000',
        firstName:'ADMIN',
        lastName:'ADMIN',
        role:'ADMIN',
        isActive:1
      });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('POST /sendActivationAccountEmail/emailAddress' , ()=>{
    it('send Activate account link ' , async()=>{
      const res=await request(app).post("/sendActivationAccountEmail/mahmoud.timoumi666@gmail.com").send({
      })
    
      expect(res.statusCode).toBe(201)
    })
  })
  
  describe('POST /login' , ()=>{
    it('User shouldnt be able to login because it doesnt activated his account yet ' , async()=>{
      const res=await request(app).post("/login").send({
        email:'mahmoud.timoumi666@gmail.com',
        password:'000000'
      })
      expect(res.statusCode).toBe(401)
    })

  })


  describe('PUT /verifyAccountLink?email=emailAddress' , ()=>{
    it('should activate account  ' , async()=>{
      const res=await request(app).put("/activateAccount?email=mahmoud.timoumi666@gmail.com").send({
      })
      expect(res.statusCode).toBe(200)
    })

    it('User should be able to login after activating it s account ' , async()=>{
      const res=await request(app).post("/login").send({
        email:'mahmoud.timoumi666@gmail.com',
        password:'000000'
      })
      console.log('\n------------------------------------------- \n ')

      usersID.push(res._body.id)

      console.log('\n---------------------------------------- \n ', usersID)

      expect(res.statusCode).toBe(200)
      expect(res.body.token).toBeDefined()
    })
    
  })
 

}


//const returnTable=async()=>{

// var tempVar
//   registerTests.then(() => {
//     console.log(`Received response: ${usersID}`);
//     tempVar=usersID
//   });
  
  
// return  tempVar
// }



module.exports= registerTests

