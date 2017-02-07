var request = require('request');
var parser = require('xml2json');

var currencyExchange = function(app) {
    app.get('/getrates', function(req, res) {

        request('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = parser.toJson(body);
                res.status(200).json({
                    response: JSON.parse(json)['gesmes:Envelope'].Cube.Cube
                });
            }
            if (error) {
                res.status(400).json({
                    response: 'Error in request'
                });
            }
        });
    });
};

exports.currencyExchange = currencyExchange;