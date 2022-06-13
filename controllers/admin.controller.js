const userService = require('../services/user.service');
class UserController{
    getLoginPage(req, res, next){
        return res.render("login")
    }

    async loginUser(req, res, next){
        let email = req.body.email
        let password = req.body.password;
        try{
            user = await userService.getUser(email);
            if(user.password == password){
                req.session.user = user;
                req.session.regenerate((error)=>{
                    if(error) throw error; 
                })
                res.redirect("/")
            }
        }catch(error){
            if(error.code == -1){
                req.flash('error', "No user exists with this identification")
                res.redirect("/login");
            }
        }



        return res.redirect("/");

    }
}

module.exports = new UserController();