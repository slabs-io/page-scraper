
var app = require('../process/app');

app.getData({searchTerm: 'what', siteUrl:'http://news.bbc.co.uk'}).then(function(data){
    console.log(data);
});

var labels = app.getLabel('mentions', {searchTerm: 'what', siteUrl:'http://news.bbc.co.uk'});
console.log(labels);