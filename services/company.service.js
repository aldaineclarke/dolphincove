const db = require("../config/db.config");

async function createCompany(compInfo){
    let data = await new Promise((resolve, reject) =>{ db.query("INSERT INTO companies SET ?", compInfo, (error, result)=>{
        if(error) reject({code: 0, message: "There was an error with the sql"});
        resolve(result);

    });
    });

    return data;
}
async function editCompany(compInfo, id){
    let data = await new Promise((resolve, reject) =>{ db.query("UPDATE companies SET ? WHERE id = ?", [compInfo, id], (error, result)=>{
        if(error) reject({code: 0, message: "There was an error with the sql"});
        resolve(result);

    });
    });

    return data;
}
async function DeleteCompany(id){
    let data = await new Promise((resolve, reject) =>{ db.query("DELETE companies WHERE id = ?", id, (error, result)=>{
        if(error) reject({code: 0, message: "There was an error with the sql"});
        resolve(result);

    });
    });

    return data;
}


module.exports = {
    createCompany,
    editCompany,
    DeleteCompany

}