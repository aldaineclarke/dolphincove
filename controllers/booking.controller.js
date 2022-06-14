const bookingService = require("../services/bookings.service");
class BookingsController{
    async getBookingPage(req, res, next){
        let programs;
        try{
            programs = await bookingService.getAllPrograms();
            res.render("booking",{programs});
        }catch(error){
            throw error;
        }
    }
    createBooking(req, res, next){
        console.log("This is in the creation \n", req.body);
        res.send({redirect: "/"});
    }
    updateBooking(req, res, next){

    }
    deleteBooking(req,res,next){}
}

module.exports = new BookingsController();