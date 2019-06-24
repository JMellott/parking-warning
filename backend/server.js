const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 4000;
const entryRoutes = express.Router();

let Entry = require('./entry.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/entries', entryRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/entries', {useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
	console.log('MongoDB database connection established successsfully');
});

app.listen(port, function() {
	console.log("Running on port: " + port);
});

entryRoutes.route('/').get(function(req, res) {
	Entry.find(function(err, warnings) {
		if (err) {
			console.log(err);
		} else {
			res.json(warnings);
		}
	});
});

entryRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	Entry.findById(id, function(err, entry) {
		res.json(entry);
	});
});

entryRoutes.route('/add').post(function(req, res) {
	let entry = new Entry(req.body);
	entry.save()
		.then(entry => {
			res.status(200).json({'entry': 'entry added successsfully'});
		})
		.catch(err => {
			res.status(400).send('adding new entry failed');
		});
});

entryRoutes.route('/update/:id').post(function(req, res) {
	Entry.findById(req.params.id, function(err, entry) {
		if (!entry) {
			res.status(404).send("data is not found");
		} else {
			entry.entry_text = req.body.entry_text;
			entry.entry_time = req.body.entry_time;
			entry.entry_author = req.body.entry_author;

			entry.save().then(entry => {
				res.json('Entry updated!');
			})
			.catch(err => {
				res.status(400).send("Update not possible");
			});
		}
	});
});