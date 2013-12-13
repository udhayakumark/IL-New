var tileConf;
var query = {};
var options = {};

exports.init = function () {
  accessConf = __conf.get("access");
};

exports.save = function (context){    
  $db.save(accessConf.dbname, accessConf.collections.access, context.data, function(result){
    result = "{ _id: " + result + " }";
    _returnJson(context, result);
  });  
};

exports.get = function (context){    
  query = context.data;
    
  $db.select(accessConf.dbname, accessConf.collections.access, query, options, function(result){  	
    _returnJson(context, result);
  });
};

exports.remove = function (context){
  query = context.data;
    
  $db.remove(accessConf.dbname, accessConf.collections.access, query, options, function(result){ 
    result = "{ success: " + result + " }";
    _returnJson(context, result);
  });
};

exports.test = function (context){
  context.contentType = $mime.html;
  $view.render(context, accessConf.views.test);
};

var _returnJson = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};