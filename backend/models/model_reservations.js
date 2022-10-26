const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservations_schema = new Schema({
    office: {type:String, required:true},
    name: {type:String, required:true},
    seat_no: {type:String, required:true},
    table_no: {type:String, required:true},
    monitor: {type:String, required:true},
    date: {type:String, required:true},
    time: {type:String, required:true}
},{timestamps:true});

module.exports = mongoose.model("Reservations", reservations_schema);