const mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'modetikbd'
});

connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('est Connecté');
    }
 });

 module.exports = connection;