class UserController{
    getLoginPage(req, res, next){
        return res.render("login")
    }

    loginUser(req, res, next){
        let email = req.body.email
        let password = req.body.password;
        

        return res.redirect("/");

    }
}

module.exports = new UserController();