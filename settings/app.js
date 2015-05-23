// pagescrape settings endpoints

var getContent = require('./page/getContent.js');
var staticsPath = require('./config').staticsPath;
var request = require('request');


exports.get = function(req, res){
    if(req.query.src !== undefined){
        getContent(req.query.src, staticsPath).then(function(data){
            res.set('Content-Type', 'text/html');
            res.end(data);
        });
    }else if(req.query.networkId && req.query.slabConfigId){
        var url = 'http://services.slabs.io/slab/trawler/' 
            + req.query.networkId + '/' + req.query.slabConfigId;
        request({
            method: 'GET',
            url: url
        }).pipe(res);
    }else {
        res.status(400).end('query paramaters required');
    }
};


// set up new page scrape service
exports.post = function(req, res){
    var slabConfigId = req.body.slabConfigId;
    var networkId = req.body.networkId;
    var settings = req.body.settings;
    
    request({
        method: 'POST',
        url:'http://services.slabs.io/slab/trawler',
        body:{
            slabId: slabConfigId,
            networkId: networkId,
            settings: settings
        },
        json:true
    }).pipe(res);
};