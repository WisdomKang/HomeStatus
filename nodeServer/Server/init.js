console.log("HomeStatus Server Setting Start.");
var express = require("express");               //express프레임워크
    app = express();                            //설정
    path=require("path");                       //경로설정 컴포넌트?
    ejs = require("ejs");                       //뷰 엔진
    router = require("./routes/route"); 

var mongoose = require("mongoose");
var db = mongoose.connection;

db.on("error", console.error);
db.once("open" , ()=>{
    console.log("Connected to mongod server");
});

//mongoose.connect('mongodb://192.168.12.13:27017/mongodb_tutorial',{useNewUrlParser:true});

//app.set('view engine', 'ejs');                  //서버 뷰 엔진 설정
app.set('views', './Server/views');             //view경로 설정 (default가 views라고는 함)

app.use(express.json());                        //express에 내장 되어있는 parser 사용.
app.use(router);

//라우터 설정보다 및에 있어야 Http 요청시 위 설정의 결로를 우선 탐색하여 더 빠른 응답속도를 보여준다.
app.use(express.static('./Server/page.js'));             
var fs = require("fs");                         //파일 설정

const httpServer = require("http").createServer(app);
httpServer.listen( 8080, ()=>{
    console.log("Starting Server is Complete.");
    console.log("Listening... ");
});

//정적리소스 설정

//MVC 라우터?

