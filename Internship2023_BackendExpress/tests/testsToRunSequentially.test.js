// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require('../app');
const User=require('../modeles/user')
const sendClaimsTest  =require( './claims&chatTests/claims.test')
const offerCrudTests  =require( './manageOfferTests/offer.test')
const registerTests  =require( './manageUsersTests/registerationProcess.test')
const cleanUp=require('./clearDB.test')

describe('sequentially run tests', () => {

    //registerTests()
    registerTests()
    sendClaimsTest()
    offerCrudTests()
    
   

    cleanUp()

//console.log(userTest.returnTable())

    // setTimeout(() => {
    //   //  console.log("Delayed for 1 second.");
    //   console.log(userTest.usersID)

    //   }, "40000");
      

    //console.log(`From the main tests the user IDS is =======================================> \n`+ usersID)
})



