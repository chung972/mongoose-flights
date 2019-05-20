var Flight = require("../models/flight");

module.exports = {
    create
};

function create(req,res){
    Flight.findById(req.params.id, function(err, flight){
        // the reason WHY we are querying a Flight is because destinations
        // are EMBEDDED withIN a Flight object. so by querying, we now have a handle 
        // on the specific flight (by calling on findById()), to which we can .push()
        // a destination (recall that the destination property in flight is an array)
        flight.destinations.push(req.body);
        // remember, we HAVE to push our newly created desintation
        // into the currently selected Flight object
        // also, whenever we SUBMIT a FORM, req.body will give us a handle on all of
        // the inputs that were specified in the form. 
        flight.save(function(err){
            // we need to use .SAVE() here and NOT!!! .create(); remember, that 
            // "destinations" is EMBEDDED within the Flight model; we do not save the
            // embedded data entities, rather, we save the MODEL that they belong to 
            res.redirect(`/flights/${flight._id}`);
        });
    });
}