var app = require('../process/app.js');
var Q = require('q');

var testCases = [];

testCases.push(app.getData({
    url: 'http://news.ycombinator.com',
    groupSelector: 'tr.athing',
    properties: [{
        selector: 'td.title>a',
        name: 'title'
    }, {
        selector: 'td.title>span.sitebit.comhead',
        name: 'site'
    }]
}));

testCases.push(app.getData({
    url: 'http://slabs.io',
    groupSelector: '',
    properties: [{
        selector: 'h1',
        name: 'title'
    }]
}));

testCases.push(app.getData({
    url: 'http://slabs.io',
    groupSelector: '',
    properties: [{
        selector: 'h1',
        name: 'title'
    }, {
        selector: 'a>img',
        name: 'img'
    }]
}));

Q.all(testCases).then(function (results) {
    results.forEach(function(result, i){
       console.log('results for process ' + i);
       console.log(result);
    });
});