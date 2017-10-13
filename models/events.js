const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let eventSchema = new Schema({
    userId: { type: String },
    id: { type: String },
    start: { type: String },
    title: { type: String },
    end: { type: String }
});


let eventModel = mongoose.model('Evento', eventSchema);


module.exports = eventModel;
