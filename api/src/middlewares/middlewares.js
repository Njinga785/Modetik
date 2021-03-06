const jwt = require("jsonwebtoken")
const config = require("../routes/config.js")
const db = require("../database/db.config.js")



const tokenMiddleware = (req, res, next) => {

    let token = req.headers.authorization
    console.log(req.headers.authorization);
    token = token.split(' ')[1]
    console.log(token)
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) throw err;
        console.log(decoded)
        if (decoded) { 
            req.decoded = decoded
            next()
        } else {
            res.status(403).send("Invalid token")
        }
    })

    
}

const isAdmin = (req, res, next) => {
    console.log("TEST +> ", req);
     let token = req.headers.authorization 
     token = token.split(' ')[1]
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) throw err;
        if (decoded.isAdmin === true) {
            next()
        } else {
            res.status(403).send("your are not the admin")
        }
    })


}

const emailMiddleware = (req, res, next) => {
    
db.query(`SELECT * FROM clients WHERE email = '${req.body.email}'`, async function (err, results) {
        if (err) throw err;
        if (results.length) {
            console.log('err email already exist')
            res.status(400).send("Email already exists")
        } else {
            next()
        }
    })
}

module.exports = { tokenMiddleware, emailMiddleware, isAdmin }