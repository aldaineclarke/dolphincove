const userService = require('../services/user.service');
const companyService = require('../services/company.service');
class UserController{
    getLoginPage(req, res, next){
        return res.render("login")
    }

    async loginUser(req, res, next){
        let email = req.body.email
        let password = req.body.password;
        console.log(email)
        try{
            let user = await userService.getUser(email);
            if(user.password == password){
                req.session.user = user;
                req.session.regenerate((error)=>{
                    if(error) throw error; 
                });
               
                return res.redirect("/auth/bookings");
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
    }
    async getAllUsers(req, res, next){
        try{
            
            let users = await userService.getUsersByCompany(req.session.user.company_id);
    
            res.render("allUsers", {users})
        }catch(error){
            console.log(error)
        }

    }
    getAddUserPage(req, res, next){
        res.render("addUser");
    }
    async addUser(req, res,next){
        let userInfo = {
            email:req.body.email,
            password: req.body.password,
            company_id: req.session.user.company_id
        }
        try{
            await userService.addNewUser(userInfo);
            res.redirect("/auth/users");
        }catch(error){
            console.log(error);
            res.redirect("/auth/users/add");
        }
    }
    async getEditUserPage(req, res, next){
        let id = parseInt(req.params.id);
        console.log(id)
        try{
            let user = await userService.getUserById(id);
            res.render("editUser",{user});
        }catch(error){
            console.log(error);
            res.redirect("/auth/users");
        }
    }
    async updateUser(req, res, next){
        let id = parseInt(req.params.id);

        let data = {
            password: req.body.password,
            email: req.body.email,
        }
        try{
            await userService.updateUserInfo(data, id);
            res.redirect("/auth/users");
        }catch(error){
            console.log(error);
            res.redirect("/auth/users/edit"+ id);
        }
    }
    async deleteUser(req, res, next){
        let id = parseInt(req.params.id);
        try{
            await userService.deleteUser(id);
            res.redirect("/auth/users");
        }catch(error){
            res.redirect("/auth/users/edit/"+id)
        }
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
           companyName: req.body.companyName,contactInfo: req.body.contactInfo, defaultPassword: req.body.defaultPassword,
           email: req.body.email
        };
        try{
            let company = await companyService.createCompany(data);
            userdata = {
                email: req.body.email,
                password: req.body.defaultPassword,
                company_id: company.insertId,
            }
            await userService.addNewUser()
            res.redirect("/auth/tourCompany");
        }catch(e){
            console.log(e)
            req.flash("error", e);
            res.redirect("/auth/tourCompany/add");
        }

    }
}

module.exports = new UserController();