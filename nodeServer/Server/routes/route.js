//express에서 Router객체를 받아 설정후 리턴!
const router = require("express").Router();
var mainController = require("../controllers/mainController");
var statusDataController = require("../controllers/statusDataController");

router.get("/dashboard", mainController.mainPage);
router.post("/status/save" , (req, res)=>{
    console.log( req.body);
    var result = statusDataController.statusRecord(req.body);
    res.end();
});

module.exports = router;        //requier를 통해 호출되면 이 모듈이 리턴된다?

