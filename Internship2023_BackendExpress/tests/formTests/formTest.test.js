const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');
questionID=[]


describe("POST /addNewQuestion", () => {
    it("should create a new question", async () => {
      const res = await request(app).post("/addNewQuestion/idUser").send({
        title: "this is a question Title",
        questionContent: "question description",
      });
     expect(res.statusCode).toBe(201);      
     expect(res.body.title).toBe("this is a question Titlee");
     expect(res.body.questionContent).toBe("question description");
     questionID.push(res.body._id)

    });
  });

  describe("GET /AllQuestion", () => {
    it("should return all question", async () => {
      const res = await request(app).get("/AllQuestion");
     expect(res.statusCode).toBe(200);
     expect(res.body.question.length).toBeGreaterThan(0);
    });
  });
  

  describe("GET /singleQuestion/idQuestion", () => {
    it("should return a single question  with all its replay", async () => {
      const res = await request(app).get('/singleQuestion/'+questionID[0]+'/');
     expect(res.statusCode).toBe(200);
     expect(res.body.question.length).toBeGreaterThan(0);
    });
  });
  
  describe("Delete /singleQuestion/idQuestion", () => {
    it("should remove   a question ", async () => {
      const res = await request(app).delete('/singleQuestion/'+questionID[0]+'/')
     expect(res.statusCode).toBe(200);
    });
  });


  describe("POST /replayToQuestion/idQuestion/idUser", () => {
    it("should add a replay to a question ", async () => {
      const res = await request(app).post('/replayToQuestion/'+questionID[0]+'/idUser').send({
        replayContent: "this a replay ",
      });
     expect(res.statusCode).toBe(200);
    });
  });

  describe("PUT /replayToQuestion/idQuestion/idUser", () => {
    it("should upate  a replay to a question ", async () => {
      const res = await request(app).put('/replayToQuestion/'+questionID[0]+'/idUser').send({
        replayContent: "this an update replay ",
      });
     expect(res.statusCode).toBe(200);
    });
  });


  describe("Delete /replayToQuestion/idQuestion/idUser", () => {
    it("should remove  a replay to a question ", async () => {
      const res = await request(app).delete('/replayToQuestion/'+questionID[0]+'/idUser')
     expect(res.statusCode).toBe(200);
    });
  });