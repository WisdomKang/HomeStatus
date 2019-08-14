
var mainController = {
    mainPage : function(req, res){
        res.render("dashboard/dashboard");
    },
    loginPage : function(req, res){
        res.render("login/login");
    },
    login : function(req, res){
        console.log(req.body);
        var reqID = req.body.id;
        var reqPwd = req.body.password;

        if(req.session){
            console.log("로그인 되어있음");
            req.session.user = "id";
            req.session.name = "Kang";
            res.json({success:ture , session: "old"});
        }else{
            req.session.user = {
                id: reqID,
                pw: reqPwd,
                authorized : true
            };
            res.json({success:ture, session:"new"});
        }
    }
}
module.exports = mainController;