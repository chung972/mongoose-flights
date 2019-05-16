var Flight = require("../models/flight");

module.exports = {
    new: newFlight,
    create
}

function newFlight(req, res){
    // respond with a form for enter new flights
    res.render("flights/new");
}

function create(req, res){
    var flight = new Flight(req.body);
    flight.save(function(err){
        // one way to handle errors in express
        if(err) return res.render("flights/new");
        // remember that TEMPLATES are automatically assumed to be relative to
        // the views folder
        console.log(flight);
        res.redirect("/flights/new");
        // TODO this is a temporary redirect url; change it to index once view 
        // is setup
    });
}