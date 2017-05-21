var Events = require('../models/eventModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/api/events', function(req, res) {
		Events.find({}, function(err, events) {
			if(err) throw err;
			res.json(events)
		})
	});

	app.post('/api/events', function(req, res) {
		var newEvent = Events({
			name: req.body.name,
			description: req.body.description,
			date: req.body.date
		})

		newEvent.save(function(err) {
			if(err) throw err;
			Events.find({}, function(err, events) {
				if(err) throw err;
				res.json(events);
			})
		})
	});

	app.delete('/api/events/:id', function(req, res) {
		Events.findByIdAndRemove(req.params.id, function(err) {
			if(err) throw err;
		})
		Events.find({}, function(err, events) {
			if(err) throw err;
			res.json(events);
		})
	});
}