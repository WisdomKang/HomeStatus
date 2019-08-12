
var mainController = {
    mainPage : function(req, res){
        res.render("dashboard/dashboard");
    },
    loginPage : function(req, res){
        res.render("login/login");
    }
}
module.exports = mainController;