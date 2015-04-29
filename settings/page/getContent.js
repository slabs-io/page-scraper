var Q = require('q');
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

module.exports = function(url, staticsPath){

  var deferred = Q.defer();
   
  var childArgs = [
    path.join(__dirname, 'phantomjs-script.js'),
    url,
    staticsPath
  ];
  
  var output = '';
   
  var phantom = childProcess.execFile(binPath, childArgs, 
        {maxBuffer: 1024 * 500}, 
        function(err, stdout, stderr) {
          if(err){
              console.error(err);
              deferred.reject(err);
              return;
          }
  });
  
  phantom.stdout.on('data', function (data) {
    output += data;
  });
  
  phantom.on('exit', function(){
    deferred.resolve(output);
  });
  
  return deferred.promise;
};