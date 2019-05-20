const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/tickets");

router.get("/flights/:id/tickets/new", ticketCtrl.new);
router.post("/tickets", ticketCtrl.create);
// remember, routes map requests to code

module.exports = router;