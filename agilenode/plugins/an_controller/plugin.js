var routes;
var formidable = require("formidable");

exports.init = function (alias) {
  var conf = __conf.get(alias);
  routes = conf;
}

exports.handleReq = function (req, res) {
  var form = new formidable.IncomingForm();
  
  form.parse(req, function(err, data, files) {
    _handleReq(req, res, data, files);
  });	
}

var _handleReq = function(req, res, data, files) {
  $log.debug("request came to controller " + req.url);
   
  var context = _createContext(req, res);
  context.data = data;
  context.files = files;
  var handlers = _getHandlers(context);

  $log.debug(handlers);
  
  if(!__util.isNullOrEmpty(handlers)){
    context.actions = handlers;    
  }
  else {
    context.notfound();  	
  }
  
  context.params = _getParams(context.path);
  context.actions.push(_processOutput);
  context.next();  
}

var _createContext = function (req, res) {
  return __context.instance(req, res);
};

var _getHandlers = function (context) {
  var route = _getRoute(context.path);
  var handlers = route.split(',');
  return handlers;
};

var _processOutput = function (context) {
  $log.debug("request processed to response");
  
  context.res.writeHead(context.statusCode, { 'Content-Type': context.contentType, 'Access-Control-Allow-Origin': "*", 'Set-Cookie': context.setCookie });  
  context.res.write(context.output);
  context.res.end();
};

var _getRoute = function (path) {
  $log.debug('getting route for path: ' + path);
  
  var route = _.find(routes, function(route, key) {
    var routeRegex = new RegExp(key, 'i');
    return routeRegex.test(path); 
  });
  
  if(route) {
    return route;
  }
  
  return '';
};

var _getParams = function (path){
  var params = path.split('/');
  params.splice(0, 3);
  
  return params;
};
