const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number,
        min: 0
    },
    flight: {
        type: Schema.Types.ObjectId,
        // type: ObjectId,
        ref: "Flight"
        // TODO: in the real world, ONE ticket can have MANY connnecting flights, so wrap flight: [{}]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Ticket", ticketSchema);