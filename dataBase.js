require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    connectionLimit : 10
})

function checkConnection(){
    connection.getConnection((err, conn)=>{
        if(err){
            console.log("Error connecting to server :" + err )
        }else{
            console.log("Sucessfull connected to database: " + conn.threadId);
        }
    })
}

module.exports = {connection, checkConnection}