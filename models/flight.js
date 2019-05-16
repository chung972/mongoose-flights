var mongoose = require("mongoose");
// optional SHORTCUT variable below
var Schema = mongoose.Schema;

// TODO: set validations and defaults 
var flightSchema = new Schema({
    // note that an OBJECT is passed in to Schema as an argument
    airline: String,
    flightNo: Number,
    departs: Date
});

module.exports = mongoose.model("Flight", flightSchema);
// we invoke .model() to compile the Schema defined above and spit out a 
// model named "Flight";
// when we start creating data using our MODEL, the COLLECTION inside the
// database will be called "movies"; by convention, is just the pluralized,
// lowercased version of the first argument passed into .model();
// again, there is a ONE-TO-ONE mapping between MODELS and COLLECTIONS;
// also, the MODEL is responsible for all CRUD (crate, retrieve, update, delete)
// operations;
