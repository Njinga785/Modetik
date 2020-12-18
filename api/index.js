const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
 
const routes = require('./src/routes/lesroutes')


app.use(bodyParser.json());

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes) 



app.listen(3003, () => {
    console.log("Server is running on port 3003.");
  });