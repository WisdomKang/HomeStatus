//express에서 Router객체를 받아 설정후 리턴!
const router = require("express").Router();
var mainController = require("../controllers/mainController");

router.get("/dashboard", mainController.mainPage);

module.exports = router;        //requier를 통해 호출되면 이 모듈이 리턴된다?
