const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const office_schema = new Schema({
    office: {type:String, required:true},
    total_seats: {type:Number, required:true},
    desks: {
        table_no: {type:Number, required:true},
        seat_capacity: {type:Number, required:true}
    }
});

module.exports = mongoose.model("Office", office_schema);