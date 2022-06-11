class IndexController{

    getHomePage(req,res,next) {
        res.render("index")
    }

}

module.exports = new IndexController();