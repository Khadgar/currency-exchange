var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

//configure the app
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var indexPath = path.join(__dirname, './public/index.html');
var publicPath = express.static(path.join(__dirname, './public'));
app.use('/', publicPath);

//routing in duedate-calculator.js
require(path.join(__dirname, './server/routes/currency-exchange-rest.js')).currencyExchange(app, indexPath);

//create server
http.listen(app.get('port'), function() {
    console.log('exchange server listening on localhost:' + app.get('port'));
});