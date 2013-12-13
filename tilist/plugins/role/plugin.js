var tileConf;
var query = {};
var options = {};

exports.init = function () {
  roleConf = __conf.get("role");
};

exports.save = function (context){    
  $db.save(roleConf.dbname, roleConf.collections.role, context.data, function(result){
    result = "{ _id: " + result + " }"; 
    _returnJson(context, result);
  });  
};

exports.get = function (context){    
  query = context.data;
    
  $db.select(roleConf.dbname, roleConf.collections.role, query, options, function(result){  	
    _returnJson(context, result);
  });
};

exports.remove = function (context){
  query = context.data;
    
  $db.remove(roleConf.dbname, roleConf.collections.role, query, options, function(result){ 
    result = "{ success: " + result + " }";
    _returnJson(context, result);
  });
};

exports.test = function (context){
  context.contentType = $mime.html;
  $view.render(context, roleConf.views.test);
};

var _returnJson = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};