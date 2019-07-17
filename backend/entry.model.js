const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entry = new Schema({
	message: {
		type: String
	},
	time_submitted: {
		type: String
	},
	author: {
		type: String
	},
	zone: {
		type: String
	}
});

module.exports = mongoose.model('Entry', Entry);