const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');

require("dotenv").config();

// /* Connecting to the database before each test. */
 beforeEach(async () => {
     await mongoose.connect(process.env.MONGO_URI);
   });
  
  /* Closing database connection after each test. */
   afterEach(async () => {
    await mongoose.connection.close();
   });


  testedOfferId=[]

  const offerCrudTests = () =>{
  describe("POST /addOffer", () => {
    it("should create a new offer", async () => {
      const res = await request(app).post("/addOffer").send({
        title: "TEST Title",
        description: "Description 2Description 2Description 2Description 2Description 2Description 2",
        universityName:"HarvardTest",
        country:"United-states",
        completeAddress:"completeAddress of the univeristy",
        mailAddress:"harvard@gamil.com",
        numberOfplaces:5,
        targetClasses:'ARCTIC, SE',
        targetDepartment:"TIC",
        score:55,
        deadlineDate:"12/12/2023",
        

      });

      expect(res.statusCode).toBe(201);
      // console.log(res.body)
      
     expect(res.body.title).toBe("TEST Title");
     expect(res.body.universityName).toBe("HarvardTest");
     expect(res.body.country).toBe("United-states");
     expect(res.body.targetClasses).toBe("ARCTIC, SE");

     testedOfferId.push(res.body._id)
//          return OfferIdToDelete

    });
  });

  describe("GET /offerList", () => {
    it("should return all offers", async () => {
      const res = await request(app).get("/offerList");
     expect(res.statusCode).toBe(200);
     expect(res.body.offers.length).toBeGreaterThan(0);
    });
  });
  

 
/*



describe("POST /bookmark/:idOffer/:idUser", () => {
    it("should bookmark an offer", async () => {
      const res = await request(app).post(
       '/bookmark/'+testedOfferId[0]+'/64e369d41d67002a547fefb3'
      );
      expect(res.statusCode).toBe(201);
    });
  });


  describe("PUT  /unbookmarkOffer/:idOffer/:idUser", () => {
    it("should remove an offer from bookmark list", async () => {
      const res = await request(app).put(
       '/unbookmarkOffer/'+testedOfferId[0]+'/64e369d41d67002a547fefb3'
      
      );

      expect(res.statusCode).toBe(202);
    });
  });

  describe("GET  bookmarkedList/:idUSER", () => {
    it("should return the  bookmark list of a user", async () => {
      const res = await request(app).get(
       '/bookmarkedList/64e369d41d67002a547fefb3'
      
      );


      expect(res.statusCode).toBe(200);
    

    });
  });



  describe("DELETE offer/:id", () => {
    it("should delete an offer", async () => {
      const res = await request(app).delete(
       '/offer/'+testedOfferId[0]
      
      );
      //console.log("the id is =====>"+testedOfferId[0])
  
      expect(res.statusCode).toBe(200);
    });
  });
*/

}


module.exports=offerCrudTests