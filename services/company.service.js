const db = require("../config/db.config");

async function createCompany(compInfo){
    let data = await new Promise((resolve, reject) =>{ db.query("INSERT INTO companies SET ?", compInfo, (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function getAllCompanies(){
    let data = await new Promise((resolve, reject) =>{ db.query("SELECT * FROM companies", (error, result)=>{
        if(error) reject({code: 0, sqlmessage: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function getCompany(id){
    let data = await new Promise((resolve, reject) =>{ db.query("SELECT * FROM companies WHERE id = ?", [id],(error, results)=>{
        if(error) reject({code: 0, message: error.sqlMessage});

        resolve(results[0]);

    });
    });

    return data;
}
async function editCompany(compInfo, id){
    let data = await new Promise((resolve, reject) =>{ db.query("UPDATE companies SET ? WHERE id = ?", [compInfo, id], (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function deleteCompany(id){
    let data = await new Promise((resolve, reject) =>{ db.query("DELETE FROM companies WHERE id = ?", id, (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}


module.exports = {
    createCompany,
    editCompany,
    deleteCompany,
    getAllCompanies,
    getCompany

}