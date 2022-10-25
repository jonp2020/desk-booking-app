const asyncHandler = require('express-async-handler');
const Users = require("../models/model_users");

const get_users = asyncHandler(async (request, response) => {
    const users = await Users.find();
    response.status(200).json(users);
});

module.exports = {get_users};