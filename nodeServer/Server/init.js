console.log("HomeStatus Server Setting Start.");
var express = require("express"),                           //express프레임워크
    app = express(),                                        //설정
    session = require("express-session"),
    path=require("path"),                                   //경로설정 컴포넌트?
    ejs = require("ejs"),                                   //뷰 엔진
    router = require("./routes/route");

var MongoStore = require("connect-mongo")(session);
//MongoDB Set and Connect
var mongoose = require("mongoose");

const mongoConnection = mongoose.createConnection('mongodb://localhost/home', {useNewUrlParser:true});
mongoConnection.on("error", console.error);
mongoConnection.once("open" , ()=>{
    console.log("Connected to mongodb server");
});

app.use( session({
    saveUninitialized:true,
    resave:true,
    secret:'secretsessionkey',
    store: new MongoStore( { mongooseConnection: mongoConnection})
}));

//MQTT Connect
// var mqtt = require("mqtt");
// var mqttClient = mqtt.connect("mqtt://localhost:1883");

// mqttClient.on("connect" , ()=>{
//     mqttClient.subscribe("/home/status", (err)=>{
//         if(err) console.log("Check Connection or Setting");
//         else console.log("Subscribe topic : /home/status");
//     });
// });

// mqttClient.on("message" , ( topic , message )=>{
//     console.log("message :" + message);
//     let data = JSON.parse(message);
//     console.log( JSON.stringify( data, null , 4));
// });


app.set('view engine', 'ejs');                              //서버 뷰 엔진 설정
app.set('views', './Server/views');                         //view경로 설정 (default가 views라고는 함)

app.use(express.json());                                    //express에 내장 되어있는 parser 사용.
app.use(router);                                            //router 설정



//Static resource path 설정
app.use(express.static('Server/views'));                    //html에서 사용하는 js 파일
app.use("/static", express.static("bower_components"));     //bower로 관리되는 외부 라이브러리 경로
app.use("/asset" , express.static("Server/asset"));

const httpServer = require("http").createServer(app);
httpServer.listen( 8080, ()=>{
    console.log("Starting Server is Complete.");
    console.log("Listening... ");
});





