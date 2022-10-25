const { exportAllDeclaration } = require("@babel/types");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app.js");
const connect_db = require("../db.js");

beforeAll(async () => {
  await connect_db()
});


afterAll(async () => {
  await mongoose.connection.close();
});


describe("Testing the API GET desks", () => {
    test("It should response the GET method", () => {
      return request(app)
        .get("/api/desks")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("Testing the API POST desks", () => {
    test("It should response the POST method", () => {
      return request(app)
        .post("/api/POST")
        .then(response => {
          expect(response.statusCode).toBe(201);
        });
    });
  });

  describe("Testing the API DELETE desks", () => {
    test("It should response the DELETE method", () => {
      return request(app)
        .delete("/api/DELETE")
        .then(response => {
          expect(response.statusCode).toBe(202);
        });
    });
  });
  

  describe("GET /api/users", () => {
    test("200 status code", () => {
      return request(app)
      .get("/api/users")
      .then((res) => {
        expect(res.statusCode).toBe(200);
      })
    })
  })


 
  