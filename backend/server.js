const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const csp = require('express-csp-header');
const mongoose = require('mongoose');
const port = 4000;
const entryRoutes = express.Router();

let Entry = require('./entry.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/entries', entryRoutes);
/*app.use(csp({
	policies: {
		'default-src': [csp.NONE],
		'img-src': [csp.SELF]
	}
}));*/
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'");
    return next();
});

//dev purposes - local data connection
//mongoose.connect('mongodb://127.0.0.1:27017/entries', {useNewUrlParser: true });
//const connection = mongoose.connection;

const connectionString = "mongodb+srv://DevUser:fdICcSrUDxizWS7h@parkingwarningcluster-ubevk.mongodb.net/ParkingWarningDB?retryWrites=true&w=majority";
mongoose.connect(connectionString, { useNewUrlParser: true });
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

entryRoutes.route('/view/:zone').get(function(req, res) {
	let area = req.params.zone;
	Entry.find({entry_zone: area}, function (err, entries) {
		if (err) {
			console.log(err);
		} else {
			res.json({entries});
		}
	});
	/*Entry.find({zone: area})
		.then(console.log(res))
		.catch(err => {
			res.status(400).send('adding new entry failed');
		});*/
});

entryRoutes.route('/update/:id').post(function(req, res) {
	Entry.findById(req.params.id, function(err, entry) {
		if (!entry) {
			res.status(404).send("data is not found");
		} else {
			entry.message = req.body.message;
			entry.time_submitted = req.body.time_submitted;
			entry.author = req.body.author;

			entry.save().then(entry => {
				res.json('Entry updated!');
			})
			.catch(err => {
				res.status(400).send("Update not possible");
			});
		}
	});

});