/* global $:false, slabs:false */
'use strict';

// set the 'from' data as a date picker
$('#fromDate').datetimepicker({
  defaultDate: new Date(),
  pickTime: false
});

// set the 'to' data as a date picker with a default value of one week in the future.
var toDate = new Date();
toDate.setDate(toDate.getDate() + 7);
$('#toDate').datetimepicker({
  defaultDate: toDate,
  pickTime: false
});

// Send the settings object to the slabs core
// This object will then be passed to your back-end slabs process.
var compileObject = function (){

  // gets the value of the input box
  var searchQuery   = $('#searchQuery').val();
  // Get the from date in milliseconds
  var fromDate      = $('#fromDate').data('DateTimePicker').getDate().valueOf();
  // Get the to date in milliseconds
  var toDate        = $('#toDate').data('DateTimePicker').getDate().valueOf();

  var settings = {
    searchTerm : searchQuery,
    fromDate : fromDate,
    toDate : toDate
  };

  console.log(settings);

  // submit the data to the slabs core, this also triggers the close of the iFrame.
  slabs.send(settings);

};
