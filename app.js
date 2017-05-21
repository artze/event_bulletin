var express = require('express');
var morgan = require('morgan')
var methodOverride = require('method-override')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var apiController = require('./controllers/apiController')

var app = express();
var port = process.env.PORT || 3000;

var dbConnection = process.env.PROD_MONGODB
mongoose.connect(dbConnection)


app.engine('html', require('ejs').renderFile);
app.set('views', './views')
app.set('view engine', 'html');
app.use('/assets', express.static('./public'))
app.use(express.static('./'))
app.use(morgan('dev'))

app.get('', function(req, res) {
	res.render('index')
})

apiController(app);

app.listen(port, function() {
	console.log(`Express running on port ${port}`)
});