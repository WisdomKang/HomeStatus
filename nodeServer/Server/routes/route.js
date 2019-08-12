//express에서 Router객체를 받아 설정후 리턴!
const router = require("express").Router();
var mainController = require("../controllers/mainController");
var statusDataController = require("../controllers/statusDataController");

router.get("/dashboard", mainController.mainPage);
router.get("/login", mainController.loginPage);

router.post("/status/save" , (req, res)=>{
    console.log( req.body);
    var result = statusDataController.statusRecord(req.body);
    res.end();
});

router.post("/login/sign", (req,res)=>{
    console.log( req.session );
    if( !req.session ){
        req.session.user = "ji";
    }
    //mainController.login(req,res);
});

module.exports = router;        //requier를 통해 호출되면 이 모듈이 리턴된다?

