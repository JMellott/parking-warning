const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entry = new Schema({
	entry_text: {
		type: String
	},
	entry_time: {
		type: String
	},
	entry_author: {
		type: String
	}
});

module.exports = mongoose.model('Entry', Entry);