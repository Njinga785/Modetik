const mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "modetik",
    // port: 3308
});

connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('est Connecté');
    }
 }); 

 let createDB = "CREATE database IF NOT EXISTS modetik";
 connection.query(createDB, function(err, results) {
   if (err) throw err;
 });

 var adminTable= "CREATE TABLE IF NOT EXISTS admin ( id INT AUTO_INCREMENT PRIMARY KEY, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password varchar(250) NOT NULL)";
 connection.query(adminTable, function(err, results) {
   if (err) throw err;
 });

var categorieTable= "CREATE TABLE IF NOT EXISTS categorie(id INT AUTO_INCREMENT PRIMARY KEY, categorieNom varchar(50) NOT NULL)"; 
connection.query(categorieTable, function(err, results) {
   if (err) throw err;
 }); 

 var clientsTable= "CREATE TABLE IF NOT EXISTS clients (id INT AUTO_INCREMENT PRIMARY KEY, firstName varchar(50) NOT NULL, lastName varchar(50) NOT NULL, email varchar(255) NOT NULL, password varchar(500) NOT NULL)";
 connection.query(clientsTable, function(err, results) {
   if (err) throw err;
 });

 var panierTable= "CREATE TABLE IF NOT EXISTS paniers (id INT AUTO_INCREMENT PRIMARY KEY, total varchar(255) NOT NULL, date varchar(500) NOT NULL, client_id int(11) DEFAULT NULL)";
 connection.query(panierTable, function(err, results) {
   if (err) throw err;
 });

 var panierItemTable= "CREATE TABLE IF NOT EXISTS panieritem (id INT AUTO_INCREMENT PRIMARY KEY, quantité varchar(50) NOT NULL, panier_id int(11) DEFAULT NULL, produit_id int(11) DEFAULT NULL)";
 connection.query(panierItemTable, function(err, results) {
   if (err) throw err;
 });

 var produitsTable= "CREATE TABLE IF NOT EXISTS produits (id INT AUTO_INCREMENT PRIMARY KEY, nom varchar(50) NOT NULL, prix varchar(50) NOT NULL, description longtext NOT NULL, photo longtext NOT NULL, categorie_id int(11) DEFAULT NULL)";
 connection.query(produitsTable, function(err, results) {
   if (err) throw err;
 });
 module.exports = connection;