var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: Date,
    roomCode: Number,
    guests: [{
        id: {type: Schema.Types.ObjectId, ref: 'Guest'},
        rsvp: Boolean
    }],
    items: [{
        id: {type: Schema.Types.ObjectId, ref: 'Item'}
    }]

});


module.exports = mongoose.model('Event', EventsSchema);
