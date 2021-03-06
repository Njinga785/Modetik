const express = require('express');
const routes = express.Router();
const db = require('../database/db.config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(10);
const config = require('./config.js');
const middlewares = require('../middlewares/middlewares.js');

/*******************************routes clients**************************************************/

/*****************************client/sign-up****************************************************/

routes.use("/clients/sign-up", middlewares.emailMiddleware)

routes.post("/clients/sign-up", async function (req, res) {

    const client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds)
    }

    try {

        if (!req.body.firstName) throw 'NO FIRSTNAME'
        if (!req.body.lastName) throw 'NO LASTNAME'
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        db.query("INSERT INTO clients SET ?", client, function (err, results) {
            if (err) {
                res.status(400).send("Error")
            }

            res.status(200).send("User inserted")
        })
    } catch (err) {
        res.status(400).send("Error")
    }

})

/*******************************************get/clients**************************/

routes.get("/clients", (req, res) => {
    try {

        db.query(`SELECT * FROM clients`, function (err, result) {
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


/***********************************client/sign-in***********************************/


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
                            let token = jwt.sign({ firstName: result[0].firstName, lastName: result[0].lastName, email: result[0].email, id: result[0].id }, config.secret, { expiresIn: 86400 });
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

/*************************************get/client/:id*****************************/

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

/*************************************update/client/:id*************************/

routes.put("/clients/:id", async function (req, res) {
    console.log(req.body)

    const profile = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds)
    }

    const id = req.params.id
    console.log(id);

    try {
        db.query(`UPDATE clients SET firstName = ?, lastName = ?, email = ?, password = ?  WHERE id = '${id}'`, [profile.firstName, profile.lastName, profile.email, profile.password], async function (err, results) {
            if (err) {
                res.status(400).send("Error")
            } else {
                res.status(200).send("Updated")


            }
        })


    } catch (err) {
        res.status(400).send("Error")
    }
})

/********************************delete/client/:id**********************************/

routes.delete("/clients/:id", async function (req, res) {

    const id = req.params.id
    console.log(id)

    try {
        db.query(`DELETE FROM clients WHERE id = '${id}'`, async function (err, results) {
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

/************************************categorie********************************/

/************************************post/categorie****************************/

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

/**************************************get/categorie**********************************/

routes.get("/categorie", (req, res) => {
    try {
        db.query(`SELECT * FROM categorie`, function (err, result) {
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

/*****************************************produits********************************/

/*************************************get/produits*******************************/

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

/****************************get/produits/filter/categorie*******************************/

routes.get("/produits/filter/:categorie_id", (req, res) => {
    try {
        db.query(`SELECT * FROM produits WHERE categorie_id = ${req.params.categorie_id}`, function (err, result) {
            if (err) {
                res.status(400).send("Error")
            } else {
                console.log(result)
                res.status(200).send(result)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send("Error")

    }
})

/*************************************get/produits/:id*********************************/

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

/*******************************************post/produits*************************************/

routes.use("/produits", middlewares.isAdmin)

routes.post("/produits", (req, res) => {
    const produit = {
        nom: req.body.nom,
        prix: req.body.prix,
        description: req.body.description,
        photo: req.body.photo,
        categorie_id: req.body.categorie_id
    }
    try {
        if (!req.body.nom) throw 'NO NAME'
        if (!req.body.prix) throw 'NO PRICE'
        if (!req.body.description) throw 'NO DESCRIPTION'
        if (!req.body.photo) throw 'NO PHOTO'
        if (!req.body.categorie_id) throw 'NO CATEGORIE'
        console.log(req.body)

        db.query("INSERT INTO produits SET ?", produit, function (err, results) {
            if (err) {
                res.status(400).send("Error")

            } else {
                res.status(200).send({ produit_id: results.insertId })
            }
        })
    } catch (err) {
        res.status(400).send("Error")
    }



})

/*************************************update/produits/:id*****************************/

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

/*********************************delete/produits/:id*************************************/

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

/**********************************admin***********************************************/

/********************************admin/sign-up*****************************************/

routes.post("/admin/sign-up", async function (req, res) {
    
    const admine = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds)
    }

    try {

        if (!req.body.name) throw 'NO NAME'
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'
        db.query("INSERT INTO admin SET ?", admine, function (err, results) {
            if (err) {
                res.status(400).send("Error")
            }

            res.status(200).send("User inserted")
        })
    } catch (err) {
        res.status(400).send("Error")
    }

})

/***********************************admin/sign-in****************************************/

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

/********************************************panier**************************************/

/******************************************post/panier**********************************/

routes.use("/panier", middlewares.tokenMiddleware)

routes.post("/panier", (req, res) => {
    try {
        console.log(req.body);
        console.log("--------------");
        console.log(req.decoded)
        // if (!req.body.date) throw 'NO DATE'
        if (!req.body.total) throw 'NO TOTAL'
        //if (!req.body.client_id) throw 'NO CLIENT'

        var sql = `INSERT INTO paniers (total, client_id) VALUES ('${req.body.total}', ${req.decoded.id})`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
            // créer une boucle qui parcours mon panier 
            // let panier = req.body
            for (var i = 0; i < req.body.addedProduits.length; i++) {
                var item = `INSERT INTO panieritem (panier_id, produit_id, quantité) VALUES('${result.insertId}', '${req.body.addedProduits[i].id}', '${req.body.addedProduits[i].quantite}')`
                db.query(item, function (err, res) {
                    if (err) throw err
                    console.log(res)
                })
            }
            res.send(result)

        });


    } catch (err) {
        // console.log(err)
        res.status(403).send(err)
    }

})

/**********************************get/panier***************************************** */

routes.get("/panier/:id", (req, res) => {
    try {
        // let id = req.params.id
        // console.log("/GET")
        db.query(`SELECT * FROM paniers WHERE client_id = '${req.params.id}'`, function (err, result) {
            if (err) {
                res.status(400).send("Error")
            } else {
                console.log('mes paniers')
                console.log(req.params.id)
                console.log(result)
                res.status(200).send(result)
            }
        })

    } catch (err) {
        // console.log(err);
        res.status(400).send("Error")

    }
})

/****************************************profil*******************************************/

/*************************************poast/profil**************************************/
routes.post("/profile", (req, res) => {
    try {
        if (!req.body.firstName) throw 'NO FIRSTNAME'
        if (!req.body.lastName) throw 'NO LASTNAME'
        if (!req.body.email) throw 'NO EMAIL'
        if (!req.body.password) throw 'NO PASSWORD'

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                console.log(hash)
                var sql = `INSERT INTO profile (firstName, lastName, email,password, profile) VALUES ('${req.body.firstName}','${req.body.lastName}', '${req.body.email}', '${hash}')`;
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

/*****************************************get/profil**************************************/

routes.get("/profile", (req, res) => {
    try {

        db.query(`SELECT profile.id, profile.firstName, profile.lastName, profile.email, profile.password FROM clients`, function (err, result) {
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

















module.exports = routes;