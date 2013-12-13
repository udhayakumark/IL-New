var url = require('url');

exports.instance = function (req, res) {
  var context = {};
  context.req = req;
  context.res = res; 
  context.path = url.parse(req.url, true).path;
  context.data;
  context.files;
  context.output = '';
  context.cookie = _getCookie(req);
  context.setCookie = '';
  context.headers = req.headers;
  context.contentType = 'text/plain';
  context.statusCode = 200;
  context.model = {};
  context.params = [];
  context.actions = [];
  context.notfound = function(){
    context.statusCode = 404;
    context.output = "404 Page Not Found.";
    _returnResponse(this);
  };
  context.next = function(){
    if(this.actions.length > 0){
      var action = this.actions[0];
      this.actions.splice(0, 1);
      
      try {
        if (typeof action == "string" ) {
          eval(action)(this);
        }
        else{
          action(this);
        }
      }
      catch(e){
        $log.error(e);

        context.statusCode = 500;
        context.output = "500 Internal Error.";
        _returnResponse(this);
      }
    }
  };

  return context;
}

var _getCookie = function (req) {
  var cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return cookies;
};

var _returnResponse = function(context){
  context.res.writeHead(context.statusCode, { 'Content-Type': context.contentType });  
  context.res.write(context.output);
  context.res.end();
}
