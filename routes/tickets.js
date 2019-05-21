const express = require("express");
const router = express.Router();
const ticketsCtrl = require("../controllers/tickets");

router.get("/flights/:id/tickets/new", ticketsCtrl.new);
// router.post("/tickets", ticketCtrl.create);
// again, i want to emphasize that the above would UN-RESTful routing; this is
// beCAUSE we are dealing with RELATED DATA RELATIONSHIPS, which demand a
// DIFFERENT set of routes: https://gist.github.com/jim-clark/d7e5c9130c9b46b253d4c47aa601596a
router.post("/flights/:id/tickets", ticketsCtrl.create);
// remember, routes map requests to code

module.exports = router;