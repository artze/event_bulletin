var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = Schema({
	name: String,
	description: String,
	date: Date
});

var Events = mongoose.model('Events', eventSchema)

module.exports = Events;