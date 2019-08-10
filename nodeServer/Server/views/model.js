var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
    temp: Number,
    humi: Number,
    dust: Number,
    last_command : String,
    time : Date
} , {collection:"status"});

module.exports = mongoose.model("status" , StatusSchema);
