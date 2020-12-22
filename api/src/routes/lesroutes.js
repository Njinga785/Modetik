const express = require('express');
const routes = express.Router();
const db = require('../database/db.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(10);
const config = require('./config.js');

//routes clients

//sign-up 

routes.post("/clients/sign-up", (req, res) => {
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

//get/clients

routes.get("/clients", (req, res) => {
    try {

        db.query(`SELECT clients.id, clients.firstName, clients.lastName, clients.email, clients.password, clients.profile FROM clients`, function (err, result) {
            if (err) {
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


//client/sign-in 

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
                        let token = jwt.sign({ firstName: result[0].firstName, email: result[0].email, id: result[0].id }, config.secret, { expiresIn: 86400 });
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

//get/client/:id 

routes.get("/clients/:id", function (req, res) {
    try {
        let id = req.params.id
        db.query(`SELECT * FROM clients WHERE clients.id = ?`, [id], function (err, result) {
            if (err) {
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

//put/client/:id 


routes.put("/clients/:id", async function (req, res) {

    try {
        
           var password =  await bcrypt.hash(req.body.password, saltRounds)
            
        
        db.query(`UPDATE clients SET firstName = '${ req.body.firstName}', lastName = '${req.body.lastName}', email = '${req.body.email}', password = '${req.body.password}', profile = '${req.body.profile}' WHERE id = ${req.params.id}`, async function (err, results) {
            if (err) {
                res.send(err)
            
                } else {
                    res.status(200).send("Updated")
                }
            
        })

    } catch (err) {
        res.status(400).send(err)
    }
}) 


routes.delete("/clients/:id", async function (req, res) {
    
    try { 
        db.query(`DELETE FROM clients WHERE email = '${req.body.email}'`, async function (err, results) { 
            if (err) {
                res.send(err)
            
                } else {
                    res.status(200).send("Delete")
                }
        })

    }catch (err) { 
        res.status(400).send(err)

    }
}) 


routes.post("/categorie", (req, res) => {
    try { 
        if (!req.body.nom) throw 'NO NAME' 

        var sql = `INSERT INTO categorie (nom) VALUES ('${req.body.nom}')`;  
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
            res.send(result)
        });

    }catch (err) { 
        console.log(err)
        res.status(403).send(err)

    }
})


routes.post("/produits", (req, res) => {
    try {
        if (!req.body.nom) throw 'NO NAME'
        if (!req.body.prix) throw 'NO PRICE'
        if (!req.body.description) throw 'NO DESCRIPTION'
        if (!req.body.photo) throw 'NO PHOTO'
        if (!req.body.categorie_id) throw 'NO CATEGORIE' 
        console.log(req.body)

        var sql = `INSERT INTO produits (nom, prix, description, photo, categorie_id) VALUES ('${req.body.nom}', '${req.body.prix}', '${req.body.description}', '${req.body.phpto}', ${parseInt(req.body.categorie_id)})`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
            res.send(result)
        });


    } catch (err) {
        console.log(err)
        res.status(403).send(err)
    }

})

routes.get("/produits", (req, res) => {
    try { 
        db.query(`SELECT * FROM produits`, function (err, result) {
            if (err) {
                res.status(400).send("Error")
            } else {
                res.status(200).send(result)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send("Error") 

    }
}) 

routes.get("/produits/:id", (req, res) => {
    try { 
        db.query(`SELECT * FROM produits WHERE categorie_id = ${req.params.id}`, function (err, result) {
            if (err) { 
                console.log(err)
                res.status(400).send("Error")
            } else {
                res.status(200).send(result)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send("Error") 

    }
}) 


routes.put("/produits/:id", async function (req, res) {

    try {
        
           db.query(`UPDATE produits SET nom = '${ req.body.nom}', prix = '${req.body.prix}', description = '${req.body.description}', photo = '${req.body.photo}', categorie_id = '${req.body.categorie_id}' WHERE id = ${req.params.id}`, async function (err, results) {
            if (err) {
                res.send(err)
            
                } else {
                    res.status(200).send("Updated")
                }
            
        })

    } catch (err) {
        res.status(400).send(err)
    }
}) 


routes.delete("/produits/:id", async function (req, res) {
    
    try { 
        db.query(`DELETE FROM produits WHERE id = '${req.params.id}'`, async function (err, results) { 
            if (err) {
                res.send(err)
            
                } else {
                    res.status(200).send("Delete")
                }
        })

    }catch (err) { 
        res.status(400).send(err)

    }
}) 


routes.post("/admin/sign-up", (req, res) => {
    try {
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                console.log(hash)
                var sql = `INSERT INTO admin (email, password) VALUES ('${req.body.email}', '${hash}')`;
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












module.exports = routes;