const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const office_schema = new Schema({
    office: {type:String, required:true},
    total_seats: {type:String, required:true},
    workstations: {type:Object, required:true}
});

module.exports = mongoose.model("Office", office_schema);