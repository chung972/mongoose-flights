var Flight = require("../models/flight");

module.exports = {
    create
};

function create(req,res){
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        // remember, we HAVE to push our newly created desintation
        // into the currently selected Flight object
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`);
        });
    });
}