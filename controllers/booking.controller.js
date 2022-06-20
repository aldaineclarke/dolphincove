const db = require("../config/db.config");
const bookingService = require("../services/booking.service");
const programService = require("../services/program.service");
const {parseDateToInputField} = require("../utilities/dateUtils");
class BookingsController{
    async getBookingPage(req, res, next){
        try{


            let programs = await programService.getAllPrograms();
            // if(req.session.user){
            //     res.render("admin_addBooking", {program})
            // }else{
            //     res.render("booking",{programs});
            // }
            res.render("admin_addBooking",{programs});
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
                company_id: (req.session.user) ? req.session.user.company_id : 1000,

            }
            let bookingInfo = await bookingService.createBooking(data);
            req.body.programList.forEach((programData)=>{ 
                let guestData = {
                    booking_id: bookingInfo.insertId,
                    program_id: programData.programID,
                    num_of_guests: programData.totalGuest,
                    excursion_date: programData.excursionDate

                }
                db.query("INSERT INTO guestPrograms SET ? ", guestData,(error,results)=>{
                    if(error) console.log(error.sqlMessage);

                    console.log(results)
                })
            })
            
        });
        // if(req.session.user){
        //     return res.send({redirect: "/auth/bookings"});
        // }else res.send({redirect: "/"});
        res.send({redirect: "/"});
    }


    async updateBooking(req, res, next){
        console.log(req.body);
        let guestPrograms = req.body.guestPrograms;
        let guestProgramsArr = guestPrograms.split(",");
        let id = parseInt(req.params.id);
        let paymentInfo =  {payment_type: req.body.paymentType}
        // if( booking.company_id != req.session.user.company_id){
        //     res.redirect("/auth/bookings");
        // }
        db.query("UPDATE payments SET ? WHERE payment_id = ? ",[paymentInfo, req.body.payment_id], async (error, result)=>{ 
            if(error){ console.log(error.sqlMessage)};
            console.log(result)
            let data = {
                guestName: req.body.fname +" "+  req.body.lname,
                origin: req.body.origin,
                // company_id: (req.session.user) ? req.session.user.company_id : 1000,
                company_id: 1000,

            }
            let bookingInfo = await bookingService.updateBooking(data, id).catch((error)=> console.log(error));
            let programList = req.body.programList.map((programData)=>{ 
                    let guestData = {
                        booking_id: id,
                        program_id: programData.programID,
                        num_of_guests: programData.totalGuest,
                        excursion_date: programData.excursionDate

                    }
                    return guestData;
            });

            guestProgramsArr.forEach((guestId, index)=>{
                db.query("UPDATE guestPrograms SET ? WHERE id = ?", [programList[index],guestId],(error,results)=>{
                    if(error) console.log(error.sqlMessage);

                    console.log(results)
                })
            });
            let insertArr = programList.slice(guestProgramsArr.length);

            insertArr.forEach((guestData)=>{
                db.query("INSERT INTO guestPrograms SET ? ", guestData,(error,results)=>{
                    if(error) console.log(error.sqlMessage);

                    console.log(results);
                })
            })
                
            res.send({redirect: "/auth/bookings"});
        });

        //         
        // // if(req.session.user){
        // //     return res.send({redirect: "/auth/bookings"});
        // // }else res.send({redirect: "/"});
        
    }
    deleteBooking(req,res,next){}

    getAddAdminBookingPage(req, res, next){
        return res.render("admin_addBooking");
    }
    async getAdminBookingPage(req, res, next){
        try{
            let id = parseInt(req.session.user.company_id);
            // if(req.session.user.company_id == 1000){
            //     let bookings = await bookingService.getAllBookings();
            // }else{
            //     let bookings = await bookingService.getBookingsMadeByCompany(req.session.user.company_id);
            // }
            let bookings = await bookingService.customGetBookingQuery(id);
            res.render("admin_allBooking",{bookings})

        }catch(error){
            console.log(error);
        }
    }
    async getEditAdminBookingPage(req, res, next){
        try{
        let id = parseInt(req.params.id);
        let programs = await programService.getAllPrograms()
        let booking = await bookingService.customGetSingleBookingQuery(id);
        if( booking.company_id != req.session.user.company_id){
            res.redirect("/auth/bookings");
        }
        let altBooking = await bookingService.getBookingById(id);
        console.log(booking)
        db.query(`SELECT * FROM guestPrograms WHERE booking_id = ${id}`, (error, results) => {
            if (error) console.log(error.sqlMessage);
            let guestPrograms = results.map((guestPrograms)=> guestPrograms.id)


            return res.render("admin_editBooking", {programs, booking, selectedPrograms: results,parseDateToInputField, payment_id: altBooking.payment_id, guestPrograms});
        })
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new BookingsController();