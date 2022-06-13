class IndexController{

    getHomePage(req,res,next) {
        res.render("index")
    }

    getBookingPage(req,res,next){
        res.render("booking.ejs");
    }
    

}

module.exports = new IndexController();