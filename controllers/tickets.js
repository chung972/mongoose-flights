const Ticket = require("../models/ticket");
const Flight = require("../models/flight");

module.exports = {
    new: newTicket,
    create
}

function newTicket(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        res.render("tickets/new", {
            title: "New Ticket",
            flight
        });
    });
}

function create(req, res) {
    Ticket.create(req.body, (err, ticket)=>{
        res.redirect(`/flights/${ticket.flight}`);
    });
}