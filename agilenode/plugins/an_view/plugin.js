var fs = require("fs");

exports.init = function() {  
};

exports.render = function(context, view){
  var content = _renderView(view);
  _renderTemplates(context, content);
};

var _renderView = function (view){
  var viewPath = __appPath + '/views/' + view;
  var content = fs.readFileSync(viewPath);
	
  return content;	
};

var _renderTemplates = function(context, content){
  var jsonModel = JSON.stringify(context.model);
  context.output = _.template(content.toString(), JSON.parse(jsonModel));
  
  context.next();
};