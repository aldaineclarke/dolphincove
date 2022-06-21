const db = require("../config/db.config")

async function getAllBookings(){
    const data = await new Promise((resolve, reject) =>{
        db.query("SELECT * FROM bookings",(error,results, fields)=>{
            if(error){return reject({code:0, message: error.sqlMessage})}
            resolve(results)
        })
    });
    return data;
}

async function getAllBookingsByCompany(id){
    const data = await new Promise((resolve, reject) =>{
        db.query("SELECT * FROM bookings WHERE company_id = ?",id,(error,results, fields)=>{
            if(error){return reject({code:0, message: error.sqlMessage})}
            resolve(results)
        })
    });
    return data;
}

async function createBooking(newData){
    const data = await new Promise((resolve, reject) =>{
        db.query("INSERT INTO bookings SET ?", newData, (error, result)=>{
            if(error) reject({code: 0, message: error.sqlMessage});
            resolve(result);
        })
    })
    return data;
}
async function updateBooking(newData, id){
    const data = await new Promise((resolve, reject) =>{
        db.query("UPDATE bookings SET ? WHERE booking_id = ?", [newData, id], (error, result)=>{
            if(error) reject({code: 0, message: error.sqlMessage});
            resolve(result);
        })
    })
    return data;
}
async function getBookingsMadeByCompany(compId){
    const data = await new Promise((resolve, reject) =>{
        db.query("SELECT * FROM admins WHERE company_id = ?",compId, (error, results)=>{ 
            if(error) reject({code: 0, message: error.sqlMessage});
            resolve(results)

        } );
    });

    return data;
}
async function getBookingById(id){
    const data = await new Promise((resolve, reject) =>{
        db.query("SELECT * FROM bookings WHERE booking_id = ?",id, (error, results)=>{ 
            if(error) reject({code: 0, message: error.sqlMessage});
            resolve(results[0]);

        } );
    });

    return data;
}
async function customGetBookingQuery(id){


    let whereClause;
    if(id){
        whereClause = "WHERE company_id = "+ id;
    }else if(id == undefined){
            whereClause = "";
    }
    const data = await new Promise((resolve, reject) =>{
        db.query(`SELECT b.booking_id, b.guestName, b.booking_date, b.origin, p.payment_type, c.companyName,pr.program, gp.num_of_guests,
        (SELECT sum(guestprograms.num_of_guests) FROM guestprograms WHERE guestprograms.booking_id = b.booking_id) as totalGuests,
        sum((SELECT programs.program_cost FROM programs WHERE programs.program_id = gp.program_id) * (SELECT sum(guestprograms.num_of_guests) FROM guestprograms WHERE guestprograms.booking_id = b.booking_id)) as totalCost
        FROM  bookings b
        INNER JOIN payments p ON p.payment_id = b.payment_id
        INNER JOIN guestprograms gp ON gp.booking_id = b.booking_id
        INNER JOIN programs pr ON pr.program_id = gp.program_id
        INNER JOIN companies c ON c.id = b.company_id  
        ${whereClause}
        group by b.booking_id;`,(error, results)=>{
            if(error) reject({code: 0 , message: error.sqlMessage});
            resolve(results);
        })
    });
    return data;
}
async function customGetSingleBookingQuery(id){
    const data = await new Promise((resolve, reject) =>{
        db.query(`SELECT b.booking_id, b.guestName, b.booking_date, b.origin, p.payment_type, c.companyName,pr.program, gp.num_of_guests,
        (SELECT sum(guestprograms.num_of_guests) FROM guestprograms WHERE guestprograms.booking_id = b.booking_id) as totalGuests,
        sum((SELECT programs.program_cost FROM programs WHERE programs.program_id = gp.program_id) * (SELECT sum(guestprograms.num_of_guests) FROM guestprograms WHERE guestprograms.booking_id = b.booking_id)) as totalCost
        FROM  bookings b
        INNER JOIN payments p ON p.payment_id = b.payment_id
        INNER JOIN guestprograms gp ON gp.booking_id = b.booking_id
        INNER JOIN programs pr ON pr.program_id = gp.program_id
        INNER JOIN companies c ON c.id = b.company_id  
        WHERE b.booking_id = ?
        GROUP BY b.booking_id;`, id,(error, results)=>{
            if(error) reject({code: 0 , message: error.sqlMessage});
            resolve(results[0]);
        })
    });
    return data;
}


module.exports = {
    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    getBookingsMadeByCompany,
    customGetBookingQuery,
    customGetSingleBookingQuery
}