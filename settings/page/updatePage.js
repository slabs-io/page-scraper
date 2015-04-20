
var DOMParser = require('xmldom').DOMParser;

module.exports = function(body, url){
    var doc = new DOMParser().parseFromString(body, 'text/html');
    var document = doc.documentElement;
    
    var head = document.getElementsByTagName('head')[0];
    
    var base = document.createElement('base');
    base.setAttribute('href', url);
    head.appendChild(base);
    
    var scripts = document.getElementsByTagName('script');
    [].forEach.call(scripts, function(script){
        script.parentNode.removeChild(script);
    });
    
    return new DOMParser().serializeToString(doc);
};