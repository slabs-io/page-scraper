var getContent = require('./page/getContent.js');
var staticsPath = require('./config').staticsPath;

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