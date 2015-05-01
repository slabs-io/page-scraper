var app = require('../process/app.js');

var settings = {
  url: 'http://news.ycombinator.com',
  groupSelector:'tr.athing',
  properties:[
        {selector:'td.title>a', name:'title'},
        {selector:'td.title>span.sitebit.comhead', name:'site'}
    ]
};

console.log('starting process...');
app.getData(settings).then(function(data){
    console.log(data);
});