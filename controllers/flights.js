var Flight = require("../models/flight");
var Ticket = require("../models/ticket");
var moment = require("moment");
// moment.js is a date library; read more here: http://momentjs.com/docs/

module.exports = {
    index,
    show,
    new: newFlight,
    create
}

function index(req, res) {
    // Query the database to gather ALL resources, b/c this is an INDEX
    Flight.find({}, function (err, flights) {
        // passing in an EMPTY query OBJECT (the first argument), we are
        // saying that we want ALL flights; then we have a callback function
        // that has an error first signature, and then a parameter name of flights
        // (which will be our handle on the array of flights that find() returns)
        res.render("flights/index", { title: "All Flights", flights, moment });
        // again, we pass in a RELATIVE path from the VIEWS directory as the first arg
        // the second arg is the CONTEXT object
        /**
         * remember, {flights} is the same as: 
         * res.render("flights/index", {
         *  flights: flights
         * }
         */
    }).sort("departs");
    // so APPARENTLY, to have ASCENDING order, you just leave the key in string; no plus sign
    // but if you want DESCENDING order, you do have to append a "-" in front of the key
}

function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        // Flight.find({req.params.id: {$nin: req.body.destinations}}, function(err, flight)){
        // TODO: test code for a bonus in lab 2

        Ticket.find({ flight: flight._id }, function (err, tickets) {
            res.render("flights/show", { title: "Flight Details", flight, tickets });
            // things might get funky here because we are NOT passing in a title
            // like we are with index or newFlight; not sure how the header partial
            // will interpret the title; actually, what happens if we DON'T define (or
            // rather, pass in) a title property, we will get an error. HOWEVER, if we 
            // DO define a title, then that's what will be shown in the header partial
            // (idk how but) it ignores(?) the ternary operators for "Add/All Flight/s"
        });
    });
}


function newFlight(req, res) {
    // respond with a form for enter new flights
    res.render("flights/new", { title: "Add Flight" });
}

function create(req, res) {
    // this for..let below will catch cases where an field is left empty on
    // the form (which would send up an empty string ""); we just delete 
    // those cases, and then the default values that we define below will kick in
    for (let key in req.body) {
        // note how we have to use SQUARE BRACKET notation here
        if (req.body[key] === "") delete req.body[key];
    }

    // below is the CONSTRUCTOR syntax; older javascript
    var flight = new Flight(req.body);
    // the line above is the point where Mongoose would step in and applies any
    // default values

    flight.save(function (err) {
        // one way to handle errors in express
        if (err) return res.render("flights/new");
        // remember that TEMPLATES are automatically assumed to be relative to
        // the views folder

        for(let key in req.body){
            if(req.body[key] === "") delete req.body[key];
        }
        // what the for..let block above does is go through the entire list of keys
        // in the body and check for any with a (strict) value of an empty string ("");
        // if we DO find such a key, then delete that key from the body; this code block
        // is primarily targetting the "departs" property (which is type: Date)
        res.redirect("/flights");
    });

    // below is a NEWER syntax
    // Flight.create(req.body, function(err, flight){
    //     console.log(flight)
    //     res.redirect("/flights");
    // });
}