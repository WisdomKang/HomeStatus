//MongoDB Setting 
var mongoose = require("mongoose");
const session = require('express-session');
var MongoStore = require("connect-mongo")(session);
const label = {label : "mongoConnect"};
var logger = require('../LogModule');

//session Store
const mongoSessionConn = mongoose.createConnection('mongodb://localhost/home', {useNewUrlParser:true});  //mongodb 스토어로 세션을 사용하기 위한 커넥션
mongoSessionConn.on("error", () => logger.error("err", label));
mongoSessionConn.once("open" , ()=>{
    logger.info("Mongodb Session management Connection is Connected", label);
});


const sessionStore = new MongoStore({
    mongooseConnection : mongoSessionConn,
    ttl : 60,
    autoRemove : "interval",
    autoRemoveInterval : 1
});

var mongoConnect = {
    connect : mongoose.connect('mongodb://localhost/home', {useNewUrlParser:true} , (err)=>{
        if(!err) logger.info("MongoDB Connected", label);
    }),
    sessionStore : sessionStore
}
module.exports = mongoConnect;