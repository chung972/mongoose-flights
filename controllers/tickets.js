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
    req.body.flight = req.params.id
    // req.params.id will return the ._id of the flight object that was passed in to 
    // tickets/new.ejs (just see the function above). because we never ask for the flight
    // id from the user, we have to ADD that property (this can be done using dot (.) notation)
    // and assign it a value of req.params.id above. Remember, this must be done BEFORE calling
    // .create on the Ticket model
    Ticket.create(req.body, (err, ticket)=>{

        // res.redirect(`/flights/${ticket.flight}`);
        // again, the above is an artifact of UN-RESTful routing; trace back to new.ejs and
        // routes/tickets.js to see more detailed explanations

        console.log(ticket);
        res.redirect(`/flights/${req.params.id}`);
    });
}