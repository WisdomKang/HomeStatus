
var mainController = {
    mainPage : function(req, res){
        console.log("login status:" + req.session.login);
        if( req.session.login ){
            res.render("dashboard/dashboard");
        }else{
            res.redirect("/loginPage");
        }
    },
    loginPage : function(req, res){
        res.render("login/login");
    },
    login : function(req, res){
        console.log(req.body);
        var reqID = req.body.userid;
        var reqPwd = req.body.password;

        req.session.login = true;
        req.session.userId = reqID;
        req.session.password = reqPwd;
        res.json( { login : req.session.login });
    },
    logout : function(req, res){
        req.session.destroy(()=> { req.session});
        res.redirect("/loginPage");
    },
    auth_check : function(req, res){
        if( req.session.login ){
            console.log("login authentication complete.");
            return next();
        }else{
            console.log("access denine.");
            return res.redirect("/loginPage");
        }
    }
}
module.exports = mainController;