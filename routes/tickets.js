const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/tickets");

router.get("/tickets/new", ticketCtrl.new);
router.post("/tickets", ticketCtrl.create);

module.exports = router;