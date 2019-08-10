var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    temp : Number,
    humi : Number,
    dust : Number,
    lastCommand : String,
    time : Date
});

module.exports = mongoose.model( "status" , statusSchema , "status");