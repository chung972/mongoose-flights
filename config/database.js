const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/flights", {useNewUrlParser: true});
// .connect() is how we connect to a database
// the first argument is a CONNECTION STRING
// note that pathing to localhost means this app is no longer deployable
// the second argument is an object of OPTIONS

var db = mongoose.connection;
// this is a shortcut variable (so we don't have to type as much)

db.on("connected", function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
// the way you hook up event listeners is with the .on method;
// also note that the first argument for .on is a MAGIC string
// meaning that it won't throw an error, but you won't know what went
// wrong either; so be careful when typing;
// the default port for mongoDB is 27017

// the advantage of creating a database.js module is for ORGANIZATION