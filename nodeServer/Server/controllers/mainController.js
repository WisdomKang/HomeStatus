
var mainController = {
    mainPage : function(req, res){
        console.log( req.session.id );
        res.render("dashboard/dashboard");
    },
    loginPage : function(req, res){
        res.render("login/login");
    },
    login : function(req, res){
        console.log(req.body);
        var reqID = req.body.id;
        var reqPwd = req.body.password; 
        res.json({ login:true });
    }
}
module.exports = mainController;