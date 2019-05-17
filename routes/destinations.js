var express = require("express");
var router = express.Router();
var destCtrl = require("../controllers/destinations");

router.post("/flights/:id/destinations", destCtrl.create);

module.exports = router;