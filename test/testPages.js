var express = require('express');
var process = require('../settings/app.js')


var app = express();
app.use('/static', express.static('dist'));
app.get('/', function(req, res){
    process.get(req, res);
});

var port = 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});