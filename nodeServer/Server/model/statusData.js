var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    temp : Number,              //온도
    humi : Number,              //습도
    dust : Number,              //미세먼지
    last_command : String,      //마지막 명령
    time : Date                 //기록시간
});

module.exports = mongoose.model( "status" , statusSchema, "status" );