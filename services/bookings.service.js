const db = require("../config/db.config")

async function getAllPrograms(){
    const data = await new Promise((resolve, reject) =>{
        db.query("SELECT * FROM programs",(err,results, fields)=>{
            if(err){return reject({code:0, message: "There is an error witht the SQL"})}
            resolve(results)
        })
    });
    return data;
}
async function createBooking(newData){
    const data = await new Promise((resolve, reject) =>{
        db.query("INSERT INTO bookings SET ?", newData, (error, result)=>{
            if(error) reject({code: 0, message: "There is an error with the sql"});
            resolve(result);
        })
    })
    return data;
}


module.exports = {
    getAllPrograms,
    createBooking
}