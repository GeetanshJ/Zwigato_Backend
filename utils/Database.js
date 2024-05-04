const mysql = require("mysql")
const express = require("express")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"zwigato",
    password:"password"
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }

    else{
        console.log("database connected");
    }

})

module.exports = connection;