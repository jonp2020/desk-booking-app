const asyncHandler = require('express-async-handler');
const Users = require("../models/model_users");

const get_users = asyncHandler( async (request, response) => {

    const users = await Users.find();
    console.log("Responded with Code", response.statusCode);
    console.log("Users:", users)
    response.status(200);

});

module.exports = {get_users};