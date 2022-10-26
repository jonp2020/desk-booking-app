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

  describe("GET /api/users", () => {
    test("200 status code", () => {
      return request(app)
      .get("/api/users")
      .then((res) => {
        expect(res.statusCode).toBe(200);
      })
    })
  })

  describe("Testing the API GET reservations", () => {
    test("It should return a 200 status code", () => {
      return request(app)
        .get("/api/reservations")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("POST /api/reservations", () => {
    const testReservation = 	{
      "office": "JEMISON",
      "name": "Jon", 
      "seat_no": "10000",
      "table_no": "10000",
      "monitor": "false",
      "date": "01/01/1900",
      "time": "N/A"
    };
    test("It should post to the db and return a 201 status code", () => {
      return request(app)
      .post("/api/reservations")
      .send(testReservation)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      })
    })
  })

    describe("Testing the API DELETE desks", () => {

    test("It should DELETE a record and return a 202", () => {
      return request(app)
        .delete("/api/reservations")
        .send({"date": "01/01/1900", "time": "N/A", "seat_no": "10000", "table_no": "10000"})
        .then(response => {
          expect(response.statusCode).toBe(202);
        });
    });
  });


 
  