var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = mongoose.Schema({
	name: String,
	cost: Number,
	claimedBy: {
		guest: {type: Schema.Types.ObjectId, ref: 'Guest'},
		user: {type: Schema.Types.ObjectId, ref: 'User'}
	}
});

module.exports = mongoose.model('Item', ItemsSchema);
