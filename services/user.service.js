const db = require("../config/db.config");

const tableName = "admins";

function getUser(email){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ? WHERE email = ?", [tableName, email],(error, user, fields)=>{
            if(error) reject({reason: "There is an error with the sql"});
            if(user.length > 1) reject({reason: "Duplicate User. The user already exists with that email"})
            resolve(user[0]);
        })
    });
}

function addNewUser(user) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO ? SET ?", [tableName, user],(error, user, fields)=>{
            if(error) reject({reason: "There is an error with the sql"});
            
            resolve({message:"User Successfully added", data: user});
        })
    });
}

function updateUser(id, user) {
    return new Promise((resolve, reject) => {
        db.query("UPDATE ? SET ? WHERE id = ?", [tableName, user, id],(error, user, fields)=>{
            if(error) reject({reason: "There is an error with the sql"});
            
            resolve({message:"User Successfully added", data: user});
        })
    });
}



module.exports = {
    getUser,
    addNewUser,
    updateUser
}