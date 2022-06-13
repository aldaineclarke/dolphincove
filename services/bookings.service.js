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


module.exports = {
    getAllPrograms,
}