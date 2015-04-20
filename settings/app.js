var getContent = require('./page/getContent.js');
var Q = require('q');
exports.get = function(req){
    if(req.query.src !== undefined){
        return getContent(req.query.src);
    }else{
        var deferred = new Q.defer();
        deferred.reject('src querystring required');
        return deferred.promise;
    }
};