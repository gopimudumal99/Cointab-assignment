const express = require("express")
const app = express();

app.use(express.json())



//route Import
const address = require('./routes/chargeRoute')

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use("/api/v1",address)

module.exports = app