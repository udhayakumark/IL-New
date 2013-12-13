var plugins = require('./plugins.js');

var setupPath = function() {
  var path = process.argv[2];
  path = __util.validPath(path);
  if(path != null) {
    global.__appPath = path;
    console.log('Application path: ' + __appPath);
    return;
  }
};

exports.init = function(appPath) {
  console.log('Initializing the application.....');
  console.log('Setting up the application path.');
  setupPath();
  console.log('Initializing the configurations....');
  __conf.init();
  console.log('Initializing the plugins....');
  plugins.init();
  console.log('Application setup complete.');
};
