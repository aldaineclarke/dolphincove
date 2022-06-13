const bookingService = require("../services/bookings.service");
class BookingsController{
    async getBookingPage(req, res, next){
        let programs;
        try{
            programs = await bookingService.getAllPrograms();
            console.log(programs)
            res.render("booking",{programs});
        }catch(error){
            throw error;
        }
    }
    createBooking(req, res, next){
        
    }
    updateBooking(req, res, next){

    }
    deleteBooking(req,res,next){}
}

module.exports = new BookingsController();