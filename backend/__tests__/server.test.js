const request = require("supertest");
const app = require("../app.js");

describe("Testing the API GET desks", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/api/desks")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });

  describe("Testing the API POST desks", () => {
    test("It should response the POST method", done => {
      request(app)
        .post("/api/POST")
        .then(response => {
          expect(response.statusCode).toBe(201);
          done();
        });
    });
  });

  describe("Testing the API DELETE desks", () => {
    test("It should response the DELETE method", done => {
      request(app)
        .delete("/api/DELETE")
        .then(response => {
          expect(response.statusCode).toBe(202);
          done();
        });
    });
  });

  