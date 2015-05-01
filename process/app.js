'use strict';

var Q = require('q');
var scraperjs = require('scraperjs');



/**
 * getLabel - passes in the config object from the client.
 * This function MUST exist and MUST return a string.
 */
exports.getLabel = function (property, settings) {

    // this is the object saved from your the /input portion of the slab.
    var searchTerm = 'news';
    var siteUrl = 'http://news.bbc.co.uk';

    if (settings && settings.searchTerm && settings.siteUrl) {
        searchTerm = settings.searchTerm;
        siteUrl = settings.siteUrl;
    }

    if (property == 'mentions') {
        return searchTerm + ' on ' + siteUrl;
    }

    return 'bad property name';

};


/**
 * getData - passes in the config object from the client.
 * This function MUST exist and MUST return a promise.
 */
exports.getData = function (settings) {

    var deferred = Q.defer();

    var url = settings.url;
    // var selector = settings.cssSelector;
    // var propertyName = settings.propertyName;

    console.log('scraping begins');
    scraperjs.StaticScraper.create(url)
        .scrape(pageFunction(settings), 
            resolve(deferred));

    return deferred.promise;

};

function pageFunction(settings){
    return function ($) {
        
        var data;
        
        // todo - groups are diff from not grouped
        if(settings.groupSelector === ''){
            data = settings.properties.map(function(prop){
               
               return $(prop.selector).map(function(){
                  var x = {};
                  x[prop.name] = $(this).text();
                  return x;
               });
            }).reduce(function(a, b){
                return a.concat(b);
            });
        }else{
            var groupSelector = settings.groupSelector || 'body';
            data = $(groupSelector).map(function(){
                var $this = $(this);
                var group = {};
                settings.properties.forEach(function(prop){
                    var item = $this.find(prop.selector);
                    group[prop.name] = item.text();
                });
                
                return group;
            });
        }
        
        return data;
    }
}

function resolve(deferred){
    return function(data){
        deferred.resolve(
            Array.prototype.slice.call(data));
    }
    
}
