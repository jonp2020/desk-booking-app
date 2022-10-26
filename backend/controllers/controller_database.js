const asyncHandler = require('express-async-handler');
const { post } = require('../app');
const Reservations = require('../models/model_reservations');
const Users = require("../models/model_users");

const get_users = asyncHandler(async (request, response) => {
    const users = await Users.find();
    response.status(200).json(users);
});

const get_reservations = asyncHandler(async (request, response) => {
    const {office, date, time} = request.body
    const reservations = await Reservations.find(office, date, time);
    response.status(200).json(reservations);
});

const post_reservations = asyncHandler(async (request, response) => {
    const {office, seat_no, table_no, monitor, date, time} = request.body
    const reservation = await Reservations.create(office, seat_no, table_no, monitor, date, time);
    response.status(201).json(reservation);
});

module.exports = {get_users, get_reservations, post_reservations};