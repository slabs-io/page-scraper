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

    var url = settings.siteUrl;
    var selector = settings.cssSelector;
    var propertyName = settings.propertyName;

    scraperjs.StaticScraper.create(url)
        .scrape(function ($) {
            return $(selector).map(function () {
                return $(this).text();
            }).get();
        }, function (items) {

            // create an array of objects
            var data = [];
            items.map(function (item) {
                var datum = {};
                datum[propertyName] = item;
                data.push(datum);
            });

            deferred.resolve(data);
        });

    return deferred.promise;

};
