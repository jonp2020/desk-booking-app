const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservations_schema = new Schema({
    office: {type:String, required:true},
    seat_no: {type:Number, required:true},
    table_no: {type:Number, required:true},
    monitor: {type:Boolean, required:true},
    date: {type:Date, required:true},
    time: {type:String, required:true}
},{timestamps:true});

module.exports = mongoose.model("Reservations", reservations_schema);