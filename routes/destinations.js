var express = require("express");
var router = express.Router();
// ALTERNATIVELY, you could also refactor the two  lines above into:
//      const router = require("express").Router();
// the only use case for keeping two separate variables is if you plan on 
// referencing either of them separately somewhere in the code below
var destCtrl = require("../controllers/destinations");

router.post("/flights/:id/destinations", destCtrl.create);

module.exports = router;