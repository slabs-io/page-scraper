var Q = require('q');
var scraperjs = require('scraperjs');

exports.start = splitUrls;
exports.update = splitUrls;

exports.execute = function(settings){
    var deferred = Q.defer();
        
    scraperjs.StaticScraper.create(settings.url)
        .scrape(pageFunction(settings), 
            function(result){
                var msg = {msg:'save', data:toArray(result)};
               deferred.resolve([msg]);
            });

    return deferred.promise;
};

function splitUrls(settings){
    return Q.fcall(function(){
       return  settings.urls.map(function(url, i){
            return {
               msg: 'job',
               jobId: url + i + Date.now(),
               settings:{
                   url: url,
                   properties: settings.properties,
                   parentSelector: settings.parentSelector,
                   groupSelector: settings.groupSelector
               }
           };
        });
    });
}

function pageFunction(settings){
    return function ($) {
        
        var data;
        
        // todo - groups are diff from not grouped
        if(settings.groupSelector === ''){
            data = settings.properties.map(function(prop){
               
               return $(prop.selector).map(function(){
                    var x = {};
                    x[prop.name] = addAttributes($(this));
                    return x;
               }).filter(function(attr){
                   return attr !== null;
               });
            }).reduce(function(a, b){
                var aArr = Array.prototype.slice.call(a);
                var bArr = Array.prototype.slice.call(b);
                return aArr.concat(bArr);
            });
        }else{
            var groupSelector = settings.groupSelector || 'body';
            data = $(groupSelector).map(function(){
                var $this = $(this);
                var group = {};
                settings.properties.forEach(function(prop){
                    var item = $this.find(prop.selector);
                    var attributes = addAttributes(item);
                    if(attributes){
                        group[prop.name] = attributes;
                    }
                });
                
                return group;
            });
        }
        
        return removeEmptyObj(data);
    };
}

function toArray(result){
    return Array.prototype.slice.call(result);
}

function addAttributes($this){
    var x = {};
    var text = $this.text();
    var src = $this.attr('src');
    var href = $this.attr('href');
    
    if(text){
        x.text = text;    
    }
    
    if(src){
        x.src = src;
    }

    if(href){
        x.href = href;    
    }
    
    if(!text && !src && !href){
        return null;
    }
    
    return x;
}

function removeEmptyObj(arr){
    return Array.prototype.slice.call(arr).filter(function(obj){
       return Object.keys(obj).length > 0; 
    });
}