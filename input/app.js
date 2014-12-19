/* global $:false */
'use strict';


$('#fromDate').datetimepicker({
  pickTime: false
});
$('#toDate').datetimepicker({
  pickTime: false
});

var compileObject = function (){
  window.top.submitSlabData({name:'twitter'});
};
