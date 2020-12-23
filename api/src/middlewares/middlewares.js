const jwt = require("jsonwebtoken")
const config = require("../routes/config.js")
const db = require("../database/db.config.js") 


const tokenMiddleware = (req, res, next) => {
    
    let token = req.headers.token
    let verifiedToken = jwt.verify(token, config.secret)

    if (verifiedToken) {
        next()
    } else {
        res.status(403).send("Invalid")
    }
} 

const isAdmin = (req, res, next) => {
    
    let token = req.headers.token
    let verifiedToken = jwt.verify(token, isAdmin, config.secret)

    if (verifiedToken) {
        next()
    } else {
        res.status(403).send("your are not the admin")
    }
}

const emailMiddleware = (req, res, next) => {
    
    db.query(`SELECT * FROM clients WHERE email = '${req.body.email}'`, async function(err, results) {
        if(results.length) {
            res.status(400).send("Email already exists")
        } else {
            next()
        }
    })
}

module.exports = {tokenMiddleware, emailMiddleware, isAdmin}