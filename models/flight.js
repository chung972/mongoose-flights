var mongoose = require("mongoose");
// optional SHORTCUT variable below
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ["AUS", "DAL", "LAX", "SEA"]
    },
    arrival: {
        type: Date,
    }
}, {
        timestamps: true
    });

var flightSchema = new Schema({
    // note that an OBJECT is passed in to Schema as an argument
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"]
    },
    // flightNo: Number is functionally the same as below;
    // the reason for assinging an OBJECT (instead of assinging a type
    // directly), is so that we can set a DEFAULT value
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            let today = new Date();
            return new Date().setFullYear(today.getFullYear() + 1);
            // NOTE! an artifact of setting the default to jump forward a year from the current date is that you
            // get an offset in the days, esp for leap years

            // new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            // answer taken from here: https://stackoverflow.com/questions/8609261/how-to-determine-one-year-from-now-in-javascript
        }
    },
    airport: {
        type: String,
        enum: ["AUS", "DAL", "LAX", "SEA"],
        default: "SEA"
    },
    destinations: [destinationSchema]
    // just to be explicit, this is where we EMBED the subdoc (desintationSchema); note that 
    // the property destinations will be an ARRAY; this will be important for the 
    // desintations CONTROLLER (we'll be PUSHing in a new destination)
}, {
        timestamps: true
        // every document will have a "created/updted at: (time)" timestamp
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
