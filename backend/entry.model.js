const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entry = new Schema({
	entry_description: {
		type: String
	},
	entry_time: {
		type: String
	},
	entry_author: {
		type: String
	},
	entry_zone: {
		type: String
	}
});

module.exports = mongoose.model('Entry', Entry);