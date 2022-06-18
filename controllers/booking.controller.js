const db = require("../config/db.config");
const bookingService = require("../services/booking.service");
const programService = require("../services/program.service");
class BookingsController{
    async getBookingPage(req, res, next){
        try{
            let programs = await programService.getAllPrograms();
            res.render("booking",{programs});
        }catch(error){
            throw error;
        }
    }
    
    createBooking(req, res, next){
        console.log(req.body);
        let paymentInfo =  {payment_type: req.body.paymentType}
        db.query("INSERT INTO payments SET ? ",paymentInfo, async (error, result)=>{ 
            if(error){ console.log(error.sqlMessage)};
            console.log(result)
            let data = {
                guestName: req.body.fname +" "+  req.body.lname,
                origin: req.body.origin,
                payment_id: result.insertId,
                company_id: 1000,
            }
            let bookingInfo = await bookingService.createBooking(data);
            req.body.programList.forEach((programData)=>{ 
                let guestData = {
                    booking_id: bookingInfo.insertId,
                    program_id: programData.programID,
                    num_of_guess: programData.totalGuest,
                    excursion_date: programData.excursionDate

                }
                db.query("INSERT INTO guestPrograms SET ? ", guestData,(error,results)=>{
                    if(error) console.log(error.sqlMessage);

                    console.log(results)
                })
            })
            
        })

        res.send({redirect: "/"});
    }
    updateBooking(req, res, next){

    }
    deleteBooking(req,res,next){}


    async getAdminBookingPage(req, res, next){
        try{
            if(req.session.user.company_id == 1000){
                let bookings = await bookingService.getAllBookings();
            }else{
                let bookings = await bookingService.getBookingsMadeByCompany(req.session.user.company_id);
            }
            let bookings = await bookingService.getAllBookings();
            res.render("admin_allBookings",{bookings})

        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new BookingsController();