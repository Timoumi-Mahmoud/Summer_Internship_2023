const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../app');
//const tempUsers=require('./userCrud.test')

let adminToken;
let simpleUserToken
let usersID=[]
    
    beforeAll((done) => {
        request(app)
          .post('/login')
          .send({
            email: 'admin@gmail.com',
            password: '000000',
          })
          
          .end((err, response) => {
            adminToken = response.body.token; 
            console.log('================>'+response.body.id)
            usersID.push(response.body.id)         
            done();
          });
      });

        
    beforeAll((done) => {
      request(app)
        .post('/login')
        
        .send({
          email:'simpleUser@gmail.com',
          password:'000000'
        })
        .end((err, response) => {
          simpleUserToken=response.body.token
          console.log('================>'+response)

          usersID.push(response.body.id)         

          done();
        });
    });

    describe('GET  /dashboard that belong only to a user with role admin', () => {
        it('It should require authorization', () => {
          return request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer}`)

            .then((response) => {
              expect(response.statusCode).toBe(401);
            });
        });
        it('test access for admin role', () => {
          return request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${adminToken}`)
            .then((response) => {
              expect(response.statusCode).toBe(200);
              expect(response.type).toBe('application/json');
            });
        });
        it('deny access for user role ', () => {
          return request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${simpleUserToken}`)
            .then((response) => {
              expect(response.statusCode).toBe(401);
              expect(response.type).toBe('application/json');
            });
        });
      });




// afterAll( 'delete two users /user/:id',async ()  => {
  
//     const res = await request(app).delete(
//      '/users/64e0d631a0656b05e89b7bec'
    
//     );
//     //console.log("the id is =====>"+testedOfferId[0])

//     expect(res.statusCode).toBe(200);
//   });

      

// afterAll(()=>{
//   console.log(usersID)
// })


// module.exports=usersID