const express = require("express");
const router = express.Router()
const {getCharge,getData} = require("../controllers/charge.controller")


router.route("/address").post(getCharge).get(getData)



module.exports = router