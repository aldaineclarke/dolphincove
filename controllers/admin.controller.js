const userService = require('../services/user.service');
const companyService = require('../services/company.service');
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
                });
               
                res.redirect("/")
            }else{
                req.flash("error", "Invalid credentials for user");
                res.redirect("/auth/login");
            }
        }catch(error){
            if(error.code == -1){
                req.flash('error', "No user exists with this identification")
                res.redirect("/auth/login");
            }
        }



        return res.redirect("/");

    }
    getDashboardPage(req, res, next){
        return res.render("dashboard");
    }
    async getTourCompanyPage(req, res, next){
        try {
            let companies = await companyService.getAllCompanies();
            return res.render("tourCompanyPage", {companies});
        }catch(error){
            console.log(error)
        }
    }
    async getAddCompanyPage(req, res, next){
        res.render("addTourCompany.ejs");

    }
    async getCompanyPage(req, res, next){
        let id = parseInt(req.params.id);
        try{
            let company = await companyService.getCompany(id);
            res.render("editTourCompany", {company})
        }catch(error){
            console.log(error);
            res.redirect("/auth/tourCompany");
        }
    }
    async updateCompany(req, res, next){
        let id = parseInt(req.params.id);
        let data = {
            companyName: req.body.companyName,contactInfo: req.body.contactInfo, defaultPassword: req.body.defaultPassword
         };
        try{
            let company = await companyService.editCompany(data, id);
            res.redirect("/auth/tourCompany");
        }catch(error){
            console.log(error);
            res.redirect("/auth/tourCompany/edit/"+id);
        }
    }
    
    async deleteCompany(req, res, next){
        let id = parseInt(req.params.id);
        try{
            await companyService.deleteCompany(id);
            res.redirect("/auth/tourCompany");
        }catch(error){
            console.log(error);
            res.redirect("/auth/tourCompany");
        }
    }

    async AddCompany(req, res, next){
        let data = {
           companyName: req.body.companyName,contactInfo: req.body.contactInfo, defaultPassword: req.body.defaultPassword
        };
        try{
            await companyService.createCompany(data);
            res.redirect("/auth/tourCompany")
        }catch(e){
            console.log(e)
            req.flash("error", e);
            res.redirect("/auth/tourCompany/add");
        }

    }
}

module.exports = new UserController();