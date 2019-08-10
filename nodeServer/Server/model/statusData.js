var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    temp : Number,
    humi : Number,
    dust : Number,
    last_command : String,
    time : Date
});

module.exports = mongoose.model( "status" , statusSchema );