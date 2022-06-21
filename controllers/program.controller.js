const programService = require("../services/program.service");
class ProgramController{

    async getAllPrograms(req, res, next){
        try{
            let programs = await programService.getAllPrograms();
            res.render("allPrograms",{programs, session:req.session});
        }catch(error){
            console.log(error);
        }
    }
    async getAddProgramPage(req, res, next){
        res.render("addProgram.ejs",{ session:req.session});

    }
    async getProgramPage(req, res, next){
        let id = parseInt(req.params.id);
        console.log(id)
        try{
            let program = await programService.getProgram(id);
            res.render("editProgram", {program, session:req.session})
        }catch(error){
            console.log(error);
            res.redirect("/auth/programs");
        }
    }
    async updateProgram(req, res, next){
        let id = parseInt(req.params.id);
        let data = {
            program: req.body.program,
            description: req.body.description, 
            program_cost: req.body.program_cost
         };
        try{
            await programService.editProgram(data, id);
            res.redirect("/auth/programs");
        }catch(error){
            console.log(error);
            res.redirect("/auth/programs/edit/"+id);
        }
    }
    
    async deleteCompany(req, res, next){
        let id = parseInt(req.params.id);
        try{
            await programService.deleteProgram(id);
            res.redirect("/auth/programs");
        }catch(error){
            console.log(error);
            res.redirect("/auth/programs");
        }
    }

    async AddProgram(req, res, next){
        let data = {
           program: req.body.program,
           description: req.body.description, program_cost: req.body.program_cost
        };
        try{
            await programService.createProgram(data);
            res.redirect("/auth/programs")
        }catch(e){
            console.log(e)
            req.flash("error", e);
            res.redirect("/auth/programs/add");
        }

    }
}


module.exports = new ProgramController(); 