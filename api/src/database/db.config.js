const mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "modetik",
   //  port: 3308
});

connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('est Connecté');
    }
 });

 module.exports = connection;