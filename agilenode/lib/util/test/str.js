var str = require('../str.js');

testEndsWith();

var testEndsWith = function() {
  var vtarget = 'this is a test string';
  var vsearch = 'g';
  console.log(str.endsWith(vtarget, vsearch));

};
