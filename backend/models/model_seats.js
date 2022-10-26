const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seats_schema = new Schema({
    office: {type:String, required:true},
    seat_no: {type:Number, required:true},
    table_no: {type:Number, required:true},
    monitor: {type:Boolean, required:true},
    reserved: {type:Boolean, required:true},
    reservation: {
        name: {type:String},
        date: {type:Date},
        time: {type:String}
    }
});

module.exports = mongoose.model("Seats", seats_schema);