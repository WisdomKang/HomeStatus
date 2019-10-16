var express = require("express"),                           //express프레임워크
    app = express(),                                        
    session = require("express-session"),
    router = require("./routes/route");

require("ejs");                                             //뷰 엔진
//log setting
var logger = require('./LogModule');
var label = { label: "Server"};

logger.info("Server Setting & Connection Start" , label);

//MongoDB Setting
var mongoSetting = require('./connProccess/mongoConnect');


//session setting
app.use( session({
    saveUninitialized:true,
    resave:true,
    secret:'secretsessionkey',
    store : mongoSetting.sessionStore
}));

//MQTT Connect setting
var mqtt = require('./connProccess/mqttConnect');



//view engine setting
app.set('view engine', 'ejs');                              //서버 뷰 엔진 설정
app.set('views', './Server/views');                         //view경로 설정 (default가 views라고는 함)

//router & body parser setting
app.use(express.json());                                    //http통신시에 json형식 사용시 필요!
app.use(router);                                            

//Static resource path 설정
app.use(express.static('Server/views'));                    //html에서 사용하는 js 파일
app.use("/static", express.static("bower_components"));     //bower로 관리되는 외부 라이브러리 경로
app.use("/asset" , express.static("Server/asset"));         //이미지등 소스경로

const httpServer = require("http").createServer(app);

//connection start
//MogoDB, MQTT, WebServer 차례로 연결 시작!
mongoSetting.connect.then(()=>{
   mqtt.connect.then(()=>{
        httpServer.listen( 8080, ()=>{
                logger.info("Server Listen port 8080.", label);
            }
        );
    });
});

