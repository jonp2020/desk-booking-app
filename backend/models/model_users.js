const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users_schema = new Schema({
    name: {type:String, required:true},
    office: {type:String, required:true}
});

module.exports = mongoose.model("Users", users_schema);