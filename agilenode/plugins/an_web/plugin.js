var http = require('http');
var server;
var conf;

exports.init = function(alias) {
  console.log('Initializing plugin: ' + alias);
  conf = __conf.get(alias);
  console.log('web config: ' + conf);
  _setupServer();
  _setupErrorHandler();
  _setupSuccessHandler();
  _startServer();
};

var _setupServer = function() {
  server = http.createServer(function(req, res) {
    $controller.handleReq(req, res);
  });
};

var _setupErrorHandler = function() {
  server.on('error', function(e) {
    console.log('Could not start server on ' + conf.host + ':' + conf.port);
    throw e;
  });
};

var _setupSuccessHandler = function() {
  server.on('listening', function(e) {
    console.log('Server running at http://' + conf.host + ':' + conf.port);
  });
};

var _startServer = function() {
  server.listen(conf.port, conf.host);
};
