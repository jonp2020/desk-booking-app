const asyncHandler = require('express-async-handler');
const { post } = require('../app');
const Reservations = require('../models/model_reservations');
const Users = require("../models/model_users");
const Office = require("../models/model_office");

const get_users = asyncHandler(async (request, response) => {

    const users = await Users.find();

    const {office} = request.query;

    const all_reservations = await Reservations.find({office});

    let date_today = new Date();
    date_today.setUTCHours(0, 0, 0, 0);
    date_today = date_today.getTime();

    const valid_reservation_dict = {};

    all_reservations.forEach(reservation => {

        const date_reservation_reversed_string = reservation.date.split("/").reverse().join('-'); // Convert DD/MM/YYYY to YYYY/MM/DD

        let date_reservation = new Date(date_reservation_reversed_string);
        date_reservation.setUTCHours(0, 0, 0, 0);
        date_reservation = date_reservation.getTime();

        if (date_reservation >= date_today) {

            if (! valid_reservation_dict[reservation.name]) valid_reservation_dict[reservation.name] = [];
            valid_reservation_dict[reservation.name].push(reservation);

        }

    });

    response.status(200).json({"users": users, "valid_reservation_dict": valid_reservation_dict});

});

const get_reservations = asyncHandler(async (request, response) => { // Get office reservations
    //const reservations = await Reservations.find(request.body);

    // Get the office layout from DB
    // loop through and create a new object which includes the bookings
    // save that into some kind of new object and send that back

    const {office, date, time} = request.query;
    // console.log(office);
    // console.log(date);
    // console.log(time);

    const all_reservations = await Reservations.find({office, date});
    let reservations = [];

    if (time == "AM") {

        reservations = all_reservations.filter(morning => morning.time === "AM" || morning.time == "FULLDAY");

    } else if (time == "PM") {

        reservations = all_reservations.filter(afternoon => afternoon.time === "PM" || afternoon.time == "FULLDAY");

    } else { reservations = all_reservations; }

    const office_space = await Office.find({office});

    // console.log("Reservations:", reservations);
    // console.log("Office Space:", office_space);

    const {...workstations} = office_space[0].workstations;

    // console.log("Workstations (Pre-Processed):", workstations);

    reservations.forEach(reservation => {
        
        const {table_no, seat_no} = reservation;
        workstations[table_no][seat_no] = true;

    });

    // console.log("Workstations (Post-Processed):", workstations);

    response.status(200).json(workstations);

});

const post_reservations = asyncHandler(async (request, response) => { // Post individual's reservation
    const reservation = await Reservations.create(request.body);
    response.status(201).json(reservation);
});

const delete_reservation = asyncHandler(async (request, response) => {
    const reservationToDelete = await Reservations.find(request.body);
    const reservation = await Reservations.deleteOne(reservationToDelete[0]._id);
    if (reservation.acknowledged) {
        response.status(202).json({message: "Your booking has been removed."});
    } else {
        response.status(400).json({message: "Booking not deleted. Please try again."})
    }
});

module.exports = {get_users, get_reservations, post_reservations, delete_reservation};