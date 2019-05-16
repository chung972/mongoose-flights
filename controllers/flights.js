var Flight = require("../models/flight");

module.exports = {
    index,
    new: newFlight,
    create
}

function index(req, res){
    Flight.find({}, function(err, flights){
        // passing in an EMPTY query OBJECT (the first argument), we are
        // saying that we want ALL flights; then we have a callback function
        // that has an error first signature, and then a parameter name of flights
        // (which will be our handle on the array of flights that find() returns)
        res.render("flights/index", {flights});
        /**
         * remember, {flights} is the same as: 
         * res.render("flights/index", {
         *  flights: flights
         * }
         */
    });
}

function newFlight(req, res){
    // respond with a form for enter new flights
    res.render("flights/new");
}

function create(req, res){
    // this for..let below will catch cases where an field is left empty on
    // the form (which would send up an empty string ""); we just delete 
    // those cases, and then the default values that we define below will kick in
    for(let key in req.body){
        // note how we have to use SQUARE BRACKET notation here
        if(req.body[key] === "") delete req.body[key];
    }
    var flight = new Flight(req.body);
    // the line above is the point where Mongoose would step in and applies any
    // default values
    flight.save(function(err){
        // one way to handle errors in express
        if(err) return res.render("flights/new");
        // remember that TEMPLATES are automatically assumed to be relative to
        // the views folder
        console.log(flight);
        res.redirect("/flights");
    });
}