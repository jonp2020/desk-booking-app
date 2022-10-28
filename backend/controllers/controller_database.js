const asyncHandler = require('express-async-handler');
const Reservations = require('../models/model_reservations');
const Users = require("../models/model_users");
const Office = require("../models/model_office");

const get_users = asyncHandler(async (request, response) => {

    let {office} = request.query;

    if (!office) return response.status(404).json({"error": 'Please provide an office to see the reservations.'})

    // Hard code office name if needed (uncomment out line above)
    // if (!office) office = 'JEMISON'

    office = office.toUpperCase()

    const users = await Users.find({office});

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
            console.log(reservation)

        }

    });

    response.status(200).json({"users": users, "valid_reservation_dict": valid_reservation_dict});

});

const get_reservations = asyncHandler(async (request, response) => { // Get office reservations
    //const reservations = await Reservations.find(request.body);

    // Get the office layout from DB
    // loop through and create a new object which includes the bookings
    // save that into some kind of new object and send that back

    let {office, date, time} = request.query;

    if (!office || !date) return response.status(404).json({"error": 'Please provide an office and date to see the reservations.'})
    // if (!office) office = 'JEMISON'
    // console.log(office);
    // console.log(date);
    // console.log(time);

    office = office.toUpperCase()

    if (!time) time = 'FULLDAY'

    time = time.toUpperCase()

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

    let { office, date, name, seat_no, table_no, time } = request.body

    if (!office || !date || !name || !seat_no || !time) return response.status(404).json({"error": 'Please provide an office, date, name, seat number and time fields to see the reservations.'})

    office = office.toUpperCase()
    time = time.toUpperCase()
    const all_reservations = await Reservations.find({office, date});

    const checkDoubleBookings = all_reservations.filter((reservation) => {

        if (reservation.name === name) {
            
            if(time === 'FULLDAY' && (reservation.time === 'AM' || reservation.time === 'PM')) return reservation
            if ((time === 'AM' || time === 'PM') && reservation.time === 'FULLDAY') return reservation
            if (time === 'AM' && reservation.time === 'AM') return reservation
            if (time === 'PM' && reservation.time === 'PM') return reservation
            if (time === 'FULLDAY' && reservation.time === 'FULLDAY') return reservation

        }

        if (reservation.seat_no === seat_no) {

            if(time === 'FULLDAY' && (reservation.time === 'AM' || reservation.time === 'PM')) return reservation
            if ((time === 'AM' || time === 'PM') && reservation.time === 'FULLDAY') return reservation
            if (time === 'AM' && reservation.time === 'AM') return reservation
            if (time === 'PM' && reservation.time === 'PM') return reservation
            if (time === 'FULLDAY' && reservation.time === 'FULLDAY') return reservation
        }


    }).length > 0

    if (checkDoubleBookings) {
        response.status(409).json({"error": "Double bookings not permitted."})
        
    } else {
        const reservation = await Reservations.create(request.body);
        response.status(201).json(reservation);
    }

});

const delete_reservation = asyncHandler(async (request, response) => {

    const reservationToDelete = await Reservations.find(request.query);
    if (!reservationToDelete.length) return response.status(404).json({"error": "Error - reservation not found. Please refresh the page and try again."})

    const reservation = await Reservations.deleteOne(reservationToDelete[0]._id);

    if (reservation.acknowledged) {
        response.status(202).json({message: "Your booking has been removed."});
    } else {
        response.status(400).json({message: "Booking not deleted. Please try again."})
    }
});

module.exports = {get_users, get_reservations, post_reservations, delete_reservation};