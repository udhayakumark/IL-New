var fs = require("fs");
var d = ' :: ';
var conf;

exports.init = function(alias) {
  conf = __conf.get(alias);
  console.log(conf);
  if(!conf) {
  	console.log('Did not find the log configuration. Setting defaults.');
    conf = {};
    conf.all = true;
  }
};

exports.critical = function(str) {
  if(conf.all || conf.critical) {
    _log('Critical Error' + d + str);
  }
};

exports.error = function(str) {
  if(conf.all || conf.error) { 
	_log('Error' + d + str);
  }
};

exports.warn = function(str) {
  if(conf.all || conf.warn) { 
    _log('Warning' + d + str);
  }
};

exports.info = function(str) {
  if(conf.all || conf.info) {
    _log('Info' + d + str);
  }
};

exports.debug = function(str) {
  if(conf.all || conf.debug) {
    _log('Debug' + d + str);
  }
};

var _log = function(str) {
  if(conf.store == 'files'){
    _writeinfilelog(str)
  } else {
    console.log((new Date()).toString() + d + 'str');
  }
};

var _writeinfilelog = function(str) {
  newline = "\r\n";
  str = (new Date()).toString() + d + str + newline;
  fs.appendFile(conf.filepath, str, function (err) {
    if (err) throw err;
  });
};
