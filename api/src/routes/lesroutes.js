const express = require('express');
const routes = express.Router();
const db = require('../database/db.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(10);
const config = require('./config.js');
const middlewares = require('../middlewares/middlewares.js');

//routes clients

//sign-up 
routes.use("/clients/sign-up", middlewares.emailMiddleware)

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


routes.post("/clients/sign-in", (req, res) => {
    try {
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        db.query(`SELECT * FROM clients WHERE email = '${req.body.email}'`, function (err, result) {
            console.log(result);
            if (err) {
                res.send('non')
            } else {
                if (result.length > 0) {
                    bcrypt.compare(req.body.password, result[0].password, function (error, results) {
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
    } catch (error) {
        res.status(403).send(error)
    }
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


// routes.put("/clients/:id", async function (req, res) {

//     try {

//         var password = await bcrypt.hash(req.body.password, saltRounds)


//         db.query(`UPDATE clients SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', email = '${req.body.email}', password = '${req.body.password}', WHERE id = ${req.params.id}`, async function (err, results) {
//             if (err) {
//                 res.send(err)

//             } else {
//                 res.status(200).send("Updated")
//             }

//         })

//     } catch (err) {
//         res.status(400).send(err)
//     }
// }) 


routes.put("/clients/:id", async function(req, res){
    let profileUpdated = {
        firstName: req.body.firstName,
        email: req.body.email,       
        // avatar: req.body.avatar,
        password: await bcrypt.hash(req.body.password, saltRounds),
        id: req.params.id
    }
    try{
        db.query(`UPDATE clients SET firstName = ?, email = ?, WHERE id = ?`, [profileUpdated.firstName, profileUpdated.email, profileUpdated.id], async function(err, results) {
            if (err) {
                res.status(400).send("Error")
            } else {

                if (req.body.password) {
                    
                    db.query(`UPDATE clients SET password = ? WHERE id = ?`, [profileUpdated.password, profileUpdated.id], function(err) {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Error")
                        } else {
                            res.status(200).send("Updated")
                        }
                    })
                } else {
                    res.status(200).send("Updated")
                }              
            }
        })     
        
       
    } catch(err){
        res.status(400).send("Error")
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

    } catch (err) {
        res.status(400).send(err)

    }
})


routes.post("/categorie", (req, res) => {
    try {
        if (!req.body.categorieNom) throw 'NO NAME'

        var sql = `INSERT INTO categorie (categorieNom) VALUES ('${req.body.categorieNom}')`;
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
        db.query(`SELECT * FROM produits WHERE id = ${req.params.id}`, function (err, result) {
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

routes.use("/produits", middlewares.isAdmin)

routes.post("/produits", (req, res) => {
    try {
        if (!req.body.nom) throw 'NO NAME'
        if (!req.body.prix) throw 'NO PRICE'
        if (!req.body.description) throw 'NO DESCRIPTION'
        if (!req.body.photo) throw 'NO PHOTO'
        if (!req.body.categorie_id) throw 'NO CATEGORIE'
        console.log(req.body)

        var sql = `INSERT INTO produits (nom, prix, description, photo, categorie_id) VALUES ('${req.body.nom}', '${req.body.prix}', '${req.body.description}', '${req.body.photo}', ${parseInt(req.body.categorie_id)})`;
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






routes.put("/produits/:id", async function (req, res) {

    try {

        db.query(`UPDATE produits SET nom = '${req.body.nom}', prix = '${req.body.prix}', description = '${req.body.description}', photo = '${req.body.photo}', categorie_id = '${req.body.categorie_id}' WHERE id = ${req.params.id}`, async function (err, results) {
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

    } catch (err) {
        res.status(400).send(err)

    }
})


routes.post("/admin/sign-up", (req, res) => {
    try {
        if (!req.body.name) throw 'NO NAME'
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        if (!req.body.profile) throw 'NO PROFILE'


        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                console.log(hash)
                var sql = `INSERT INTO admin (name, email, password, profile) VALUES ('${req.body.name}', '${req.body.email}', '${hash}', '${req.body.profile}')`;
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



routes.post("/admin/sign-in", (req, res) => {
    try {
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
    db.query(`SELECT * FROM admin WHERE email = '${req.body.email}'`, function (err, result) {
        console.log(result);
        if (err) {
            res.send('non')
        } else {
            if (result.length > 0) {
                bcrypt.compare(req.body.password, result[0].password, function (error, results) {
                    console.log(results)
                    if (results === true) {
                        let token = jwt.sign({ email: result[0].email, id: result[0].id, isAdmin: true }, config.secret, { expiresIn: 86400 });
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
} catch (error) {
    res.status(403).send(error)
}

})

routes.use("/panier", middlewares.tokenMiddleware)

routes.post("/panier", (req, res) => {
    try {
        if (!req.body.date) throw 'NO DATE'
        if (!req.body.total) throw 'NO TOTAL'
        if (!req.body.client_id) throw 'NO CLIENT'
        console.log(req.body)

        var sql = `INSERT INTO panier (date, total, client_id) VALUES ('${req.body.date}', '${req.body.total}', ${parseInt(req.body.client_id)})`;
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


routes.post("/panieritem", (req, res) => {
    try {
        if (!req.body.product_id) throw 'NO PRODUIT_ID'
        if (!req.body.panier_id) throw 'NO PANIER_ID'
        if (!req.body.quantite) throw 'NO QUANTITE'
        console.log(req.body)

        var sql = `INSERT INTO panieritem (produit_id, panier_id, quantite) VALUES ('${req.body.produit_id}', '${req.body.panier_id}', '${req.body.quantite}')`;
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















module.exports = routes;