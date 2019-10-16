//express에서 Router객체를 받아 설정후 리턴!
const router = require("express").Router();
var mainController = require("../controllers/mainController");
var statusDataController = require("../controllers/statusDataController");

router.get("/", mainController.auth_check, function(){ return res.end();});

router.get("/dashboard", mainController.mainPage);
router.get("/loginPage", mainController.loginPage);

router.post("/login/sign", mainController.login);
router.post("/logout", mainController.logout);

router.get("/home/status", statusDataController.statusSearch);
router.post("/home/control", statusDataController.command);

module.exports = router;        //requier를 통해 호출되면 이 모듈이 리턴된다?

