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



    settings = {
      url:'http://slabs.io',
      groupSelector:'',
      properties:[
        {selector:'h1', name:'title'}  
      ]
    };
    
    console.log('process 2');
    
    app.getData(settings).then(function(data){
      console.log(data);
    });
});

