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
    test("Testing get_users gives correct name", () => {
      return request(app)
      .get("/api/users")
      .query({"office": "JEMISON"})
      .then((res) => {
        expect(res.body.users).toEqual(expect.any(Array));
        expect(res.body.users[0].name).toBe("Zac");
        expect(res.body.users[1].name).toBe("Jon");
        expect(res.body.users[2].name).toBe("Joshua");
        expect(res.body.users[0].office).toBe("JEMISON");
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
      "date": "01/01/3000",
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
        expect(res.body.date).toBe("01/01/3000");
        expect(res.body.time).toBe("FULLDAY");
      })
    })
  })

  describe("POST /api/reservations", () => {

    const testReservation = 	{
      "office": "JEMISON",
      "name": "Jon", 
      "seat_no": "20",
      "table_no": "T5",
      "monitor": "false",
      "date": "01/01/3000",
      "time": "FULLDAY"
    };
    test("It shouldn't allow double bookings", () => {
      return request(app)
      .post("/api/reservations")
      .send(testReservation)
      .then((res) => {
        expect(res.statusCode).toBe(409);
        // expect(res.body.office).toBe("JEMISON");
      })
    })
  })
        
  describe("GET /api/users", () => {
    test("200 status code", () => {
      return request(app)
      .get("/api/users")
      .query({"office": "JEMISON"})
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.valid_reservation_dict.Jon).toEqual(expect.any(Array));
        expect(res.body.valid_reservation_dict.Jon[res.body.valid_reservation_dict.Jon.length - 1].date).toBe("01/01/3000");
      })
    })
  })

  describe("Testing the API DELETE desks", () => {

  test("It should DELETE a record and return a 202", () => {
    return request(app)
      .delete("/api/reservations")
      .send({"date": "01/01/3000", "time": "FULLDAY", "seat_no": "20", "table_no": "T5"})
      .then(response => {
        expect(response.statusCode).toBe(202);
      });
  });
});
  describe("Testing the API DELETE desks when record does not exist", () => {

  test("It should fail to find a record to delete and return a 404", () => {
    return request(app)
      .delete("/api/reservations")
      .send({"date": "01/01/3000", "time": "FULLDAY", "seat_no": "20", "table_no": "T5"})
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});

  