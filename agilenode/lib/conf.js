var confPath;
var confs = {}
var app = 'app';
var plugins = 'plugins';
exports.init = function() {
  confPath = __util.validPath(__appPath + 'conf');
  console.log('Loading configuration files from path: ' + confPath);
  console.log('Loading app.json...');
  _load(app);
  console.log('Loading plugin.json and plugin configurations');
  _load(plugins);
};

exports.load = function(name) {
  _load(name);
};

exports.get = function(name) {
  return _get(name);
};

exports.appConf = function() {
  return _get(app);
};

var _load = function(name) {
 var file = confPath + name + '.json';
  if(__util.isValidFile(file)) {
    confs[name] = require(file);
    console.log('Loaded configuration for: ' + name);
  } else {
    console.log('No configuration found for ' + name);
  }
};

var _get = function(name) {
  return confs[name];
};
