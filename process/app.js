/**
 * Page-Scraper process
 */

'use strict';

var Q = require('q');
var request = require('request');


/**
 * @param settings - settings saved through the slabs interface
 * @param data - if there are dependencies, they pass their data here
 */
exports.getData = function (settings, data) {
    var deferred = Q.defer();
    
    if(!settings.settingId){
        deferred.resolve([]);
        return;
    }
    
    var url = 'http://services.slabs.io/slab/pagescrape/' + settings.settingId;
    
    request({
        method: 'GET',
        url: url
    }, function(err, response, body){
        if(err){
            deferred.reject(err);
            return;
        }
        
        deferred.resolve(body);
    });
    
    
    // only need to update service if there is dependency data
    // because otherwise the settings will be static so service is fine without
    if(data){
        
        settings.urls = data[0];
        
        // not particularly interested in the response at this point
        request({
            method: 'POST',
            url: url,
            body: {
                settings:settings
            }
        });
    }
    
    return deferred.promise;
    
};