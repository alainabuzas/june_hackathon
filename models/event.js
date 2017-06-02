var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: String,
    // guests: [{
    //     id: {type: Schema.Types.ObjectId, ref: 'Guest'},
    //     rsvp: Boolean
    // }],
    items: Array
});


module.exports = mongoose.model('Event', EventsSchema);
