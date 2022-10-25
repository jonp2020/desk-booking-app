// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app.js");
// const connect_db = require("../db.js");

// beforeEach(() => {
//   connect_db()
// });

// afterAll(() => {
//   mongoose.connection.close()
// });

// mongoose
//     .connect( process.env.MONGO_URI)
//     .then(() => {
//         mongoose.set('useFindAndModify', false)
//     })

// afterAll (async () => {
//   await mongoose.connection.close();
// })

// describe("Testing the API GET desks", () => {
//     test("It should response the GET method", () => {
//       return request(app)
//         .get("/api/desks")
//         .then(response => {
//           expect(response.statusCode).toBe(200);
//           done();
//         });
//     });
//   });

//   describe("Testing the API POST desks", () => {
//     test("It should response the POST method", () => {
//       return request(app)
//         .post("/api/POST")
//         .then(response => {
//           expect(response.statusCode).toBe(201);
//           done();
//         });
//     });
//   });

  // describe("Testing the API DELETE desks", () => {
  //   test("It should response the DELETE method", () => {
  //     return request(app)
  //       .delete("/api/DELETE")
  //       .then(response => {
  //         expect(response.statusCode).toBe(202);
  //         done();
  //       });
  //   });
  // });

  // describe("Testing get_users", () => {
  //   test("It should respond with status 200", () => {
  //     return request(app)
  //       .get("/api/users")
  //       .expect(200);
  //       // .then(response => {
  //       //   //expect(response.statusCode).toBe(200);
  //       //   expect(200);
  //       //   done();
  //       // });
  //   });
  // });

  // describe("GET /api/users", () => {
  //   // Connect to Database in here and get it running
  //   // Stop frontend test from complaining
  //   test("200 status code", () => {
  //     return request(app).get("/api/users").expect(200);
  //   });
  // });