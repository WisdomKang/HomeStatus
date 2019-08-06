console.log("HomeStatus Server Setting Start.");
var express = require("express");               //express프레임워크
    app = express();                            //설정
    path=require("path");                       //경로설정 컴포넌트?
    ejs = require("ejs");                       //뷰 엔진
    router = require("./routes/mainController"); 

app.set('view engine', 'ejs');      //서버 뷰 엔진 설정
app.set('views', 'views');          //view경로 설정 (default가 views라고는 함)
app.use(router);
var fs = require("fs");             //파일 설정

const httpServer = require("http").createServer(app);
httpServer.listen( 8080, ()=>{
    console.log("Starting Server is Complete.");
    console.log("Listening... ");
});

//정적리소스 설정

//MVC 라우터?

