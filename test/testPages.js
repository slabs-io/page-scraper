var express = require('express');
var process = require('../settings/app.js')


var app = express();
app.use('/static', express.static('dist'));
app.get('/', function(req, res){
    console.log(req.query.src);
    process.get(req).then(function(data){
        console.log('checking');
        res.end(data);
    }, function(error){
        console.log('nope nope nope');
        res.end(error);
    });
});

var port = 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});