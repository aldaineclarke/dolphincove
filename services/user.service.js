const db = require("../config/db.config");

const tableName = "admins";

function getUser(email){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM admins WHERE email = ?", [email],(error, user, fields)=>{
            if(error) reject({code: 0 , message:error.sqlMessage});
            if(user.length > 1) reject({code: 1,message: "Duplicate User. The user already exists with that email"});
            if(user.length == 0) reject({code:-1, message: "No record by that name."})
            resolve(user[0]);
        })
    });

}
function getUserById(id){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM admins WHERE id = ?", [id],(error, user, fields)=>{
            if(error) reject({code: 0 , message:error.sqlMessage});
            if(user.length > 1) reject({code: 1,message: "Duplicate User. The user already exists with that email"});
            if(user.length == 0) reject({code:-1, message: "No record by that name."})
            resolve(user[0]);
        })
    });

}



function getUsersByCompany(comp_id){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM admins WHERE company_id = ?",comp_id, (error, users)=>{
            if(error) reject({code: 0, message: error.sqlMessage});

            resolve(users);
        })
    })
}

function addNewUser(user) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO admins SET ?", [user],(error, user, fields)=>{
            if(error) reject({code: 0 , message:error.sqlMessage});
            
            resolve({message:"User Successfully added", data: user});
        })
    });
}

function updateUserInfo(user,id) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE admins SET ? WHERE id = ?", [user, id],(error, user, fields)=>{
            if(error) reject({code:0, message: error.sqlMessage});
            resolve({message:"User Successfully added", data: user});
        })
    });
}
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM admins WHERE id = ?", [id],(error, user, fields)=>{
            if(error) reject({code:0, message: error.sqlMessage});
            resolve({message:"User Successfully added", data: user});
        })
    });
}



module.exports = {
    getUser,
    addNewUser,
    updateUserInfo,
    getUsersByCompany,
    getUserById,
    deleteUser
}