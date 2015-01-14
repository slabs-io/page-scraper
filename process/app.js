'use strict';

var Q       = require('q');
var scrap   = require('scrap');


/**
 * getData - passes in the config object from the client.
 * This function MUST exist and MUST return a promise.
 */
exports.getData = function(settings) {

    // this is the object saved from your the /input portion of the slab.
    var searchTerm  = 'terror';
    var siteUrl     = 'http://www.dailymail.co.uk';

    if(settings && settings.searchTerm && settings.siteUrl){
        searchTerm  = settings.searchTerm;
        siteUrl     = settings.siteUrl;
    }

    // Slabs works on a promise system - for this we use the excellent 'Q' library.
    var deferred = Q.defer();

    var data = {
        mentions : 0
    };


    scrap(siteUrl, function(err, $) {

        if(err){
            console.error(err);
        }

        var pageContents = $('body').html();
        var res = pageContents.match(new RegExp(searchTerm, 'gi'));

        if(res){
            // return your data like this...
            data.mentions = res.length;
            deferred.resolve(data);
            console.log('data : ');
            console.log(data);
        }else{
            // return your data like this...
            deferred.resolve(data);
            console.log('no data : ');
            console.log(data);
        }

    });


    // Always return your promise here.
    return deferred.promise;

};

exports.getData();


