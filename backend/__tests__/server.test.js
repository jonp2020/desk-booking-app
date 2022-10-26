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

  describe("GET /api/users", () => {
    test("Testing get_users gives correct name", () => {
      return request(app)
      .get("/api/users")
      .then((res) => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0].name).toBe("Zac");
        expect(res.body[1].name).toBe("Jon");
        expect(res.body[2].name).toBe("Joshua");
        expect(res.body[0].office).toBe("JEMISON");
      })
    })
  })

  describe("Testing the API GET reservations", () => {
    test("It should return a 200 status code", () => {
      return request(app)
        .get("/api/reservations")
        .query({"office": "JEMISON", "date": "01/01/1901", "time": "FULLDAY"})
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("POST /api/reservations", () => {
    const testReservation = 	{
      "office": "JEMISON",
      "name": "Jon", 
      "seat_no": "20",
      "table_no": "T5",
      "monitor": "false",
      "date": "01/01/1900",
      "time": "FULLDAY"
    };
    test("It should post to the db and return a 201 status code", () => {
      return request(app)
      .post("/api/reservations")
      .send(testReservation)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.office).toBe("JEMISON");
        expect(res.body.name).toBe("Jon");
        expect(res.body.seat_no).toBe("20");
        expect(res.body.table_no).toBe("T5");
        expect(res.body.monitor).toBe("false");
        expect(res.body.date).toBe("01/01/1900");
        expect(res.body.time).toBe("FULLDAY");
      })
    })
  })

  describe("Testing the API DELETE desks", () => {

  test("It should DELETE a record and return a 202", () => {
    return request(app)
      .delete("/api/reservations")
      .send({"date": "01/01/1900", "time": "FULLDAY", "seat_no": "20", "table_no": "T5"})
      .then(response => {
        expect(response.statusCode).toBe(202);
      });
  });
});


 
  