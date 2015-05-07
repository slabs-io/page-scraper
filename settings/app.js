var getContent = require('./page/getContent.js');
var staticsPath = require('./config').staticsPath;
var scraper = require('../process/app.js');

exports.get = function(req, res){
    if(req.query.src !== undefined){
        getContent(req.query.src, staticsPath).then(function(data){
            res.set('Content-Type', 'text/html');
            res.end(data);
        });
    }else{
        res.status(400).end('query string src property required');
    }
};

exports.post = function(req, res){
    scraper.getData(req.body).then(function(data){
        res.json({
            data: data,
            success:'success'
        }); 
    });
};