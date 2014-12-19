'use strict';

var Q = require('q');


// This is some sample data in reality this would be returned from some api.
var sampleData = {

    dateFrom    : '1416654884000',
    dateTo      : '1417000484000',
    categories  : ['date'],
    series      : ['tweets'],
    data        : [
        {date : '21/11/2014', tweets: '15'},
        {date : '22/11/2014', tweets: '10'},
        {date : '23/11/2014', tweets: '8'},
        {date : '24/11/2014', tweets: '25'},
        {date : '25/11/2014', tweets: '18'},
        {date : '26/11/2014', tweets: '4'}
    ]

};


/**
 * getData - passes in the config object from the client.
 * This function MUST exist and MUST return a promise.
 */
exports.getData = function(config) {

    // this is the object saved from your the /input portion of the slab.
    console.log(config);

    // Slabs works on a promise system - for this we use the excellent 'Q' library.
    var deferred = Q.defer();

    // In this simple example we are using a timeout, this is simply to show the process is asynchronous.
    setTimeout(function(){

        // return your data like this...
        deferred.resolve(sampleData);

    },1000);

    // Always return your promise here.
    return deferred.promise;

};
