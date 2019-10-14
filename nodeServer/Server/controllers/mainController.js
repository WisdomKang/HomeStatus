
var mainController = {
    mainPage : function(req, res){
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
        var reqID = req.body.id;
        var reqPwd = req.body.password+"";
        if( reqID == "KANG" && reqPwd == "0987"){
            req.session.login = true;
            req.session.userId = reqID;
        }else{
            req.session.login = false;
        }

        res.json( { login : req.session.login });
    },
    logout : function(req, res){
        req.session.destroy(()=> { req.session});
        res.redirect("/loginPage");
    },
    auth_check : function(req, res){
        if( req.session.login ){
            return next();
        }else{
            return res.redirect("/loginPage");
        }
    }
}
module.exports = mainController;