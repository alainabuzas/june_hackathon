var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuestsSchema = mongoose.Schema({
	name: String,
	phoneNumber: Number
});

module.exports = mongoose.model('Group', GuestsSchema);
