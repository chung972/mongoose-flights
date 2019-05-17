var express = require('express');
var router = express.Router();
var flightsCtrl = require("../controllers/flights");

/* GET /flights */
router.get("/", flightsCtrl.index);
/* GET /flights/new */
router.get("/new", flightsCtrl.new);
router.post("/", flightsCtrl.create);
router.get("/:id", flightsCtrl.show);

module.exports = router;
