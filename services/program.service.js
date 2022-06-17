const db = require("../config/db.config");

async function createProgram(compInfo){
    let data = await new Promise((resolve, reject) =>{ db.query("INSERT INTO programs SET ?", compInfo, (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function getAllPrograms(){
    let data = await new Promise((resolve, reject) =>{ db.query("SELECT * FROM programs", (error, result)=>{
        if(error) reject({code: 0, sqlmessage: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function getProgram(id){
    let data = await new Promise((resolve, reject) =>{ 
        db.query("SELECT * FROM programs WHERE program_id = ?", id,(error, results)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(results[0])


    });
    });

    return data;
}
async function editProgram(compInfo, id){
    let data = await new Promise((resolve, reject) =>{ db.query("UPDATE programs SET ? WHERE program_id = ?", [compInfo, id], (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}
async function deleteProgram(id){
    let data = await new Promise((resolve, reject) =>{ db.query("DELETE FROM programs WHERE program_id = ?", id, (error, result)=>{
        if(error) reject({code: 0, message: error.sqlMessage});
        resolve(result);

    });
    });

    return data;
}


module.exports = {
    createProgram,
    editProgram,
    deleteProgram,
    getAllPrograms,
    getProgram

}