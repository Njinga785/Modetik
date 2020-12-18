const express = require('express'); 
const routes = express.Router(); 
const db = require('../database/db.config.js'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(10); 
const config = require('./config.js');  

//routes clients

routes.post("/sign-up", (req, res) => {
    try {
        if (!req.body.firstName) throw 'NO FIRSTNAME' 
        if (!req.body.lastName) throw 'NO LASTNAME'
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        if (!req.body.profile) throw 'NO PICTURE'
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                console.log(hash)
                var sql = `INSERT INTO clients (firstName, lastName, email,password, profile) VALUES ('${req.body.firstName}','${req.body.lastName}', '${req.body.email}', '${hash}', '${req.body.profile}')`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result)
                    res.send(result)
                });
            });
        });
    } catch (err) {
        res.status(403).send(err)
    }

}) 

routes.get("/clients", (req, res) => {
    try {
        
        db.query(`SELECT clients.id, clients.firstName, clients.lastName, clients.email, clients.password, clients.profile FROM clients`, function (err, result) {
            if(err) {
                res.status(400).send("Error")
                throw err
            }

            res.status(200).send(result)
        })
    } catch (err) {
        res.status(403).send("Error") 
        throw err
    }

}) 

routes.post("/client/sign-in", (req, res) => {
    const password = req.body.password
    const email = req.body.email;
    db.query(`SELECT * FROM clients WHERE email = '${req.body.email}'`, function (err, result) {
         console.log(result);
        if (err) {
            res.send('non')
        } else {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, function (error, results) {
                    console.log(results)
                    if (results === true) {
                        let token = jwt.sign({ firstName: result[0].firstName, email: result[0].email, id:result[0].id }, config.secret, { expiresIn: 86400 });
                        console.log(token)
                        res.send({ token: token })
                        console.log('your recognize')
                    } else {
                        console.log('who are you')
                         console.log(results);
                    }

                })
            } else {
                console.log('faux mail')
            }

        }

    })
}) 

routes.get("/clients/:id", function(req, res) {
    try {
        let id = req.params.id 
        db.query(`SELECT * FROM clients WHERE clients.id = ?`, [id], function(err, result){
            if (err){
                res.status(400).send("Error")
            } else {
                res.status(200).send(result)
            }
        })  

    } catch (err) {
        console.log("catch");
        res.status(400).send("Error")
    }
})







module.exports = routes;