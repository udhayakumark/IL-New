var categoryconf;
var query = {};
var options = {};

exports.init = function () {
  categoryconf = __conf.get("category");
};

exports.save = function(context){ 
  $db.save(categoryconf.dbname, categoryconf.collections.category, context.data, function(result){
    result = "{ _id: " + result + " }";
    _returnJSON(context, result);
  });   
};

exports.get = function (context){ 	
  query = context.data;  
  
  $db.select(categoryconf.dbname, categoryconf.collections.category, query, options, function(result){
     _returnJSON(context, result);
  });
};

exports.remove = function (context){
  query = context.data; 	
  
  $db.remove(categoryconf.dbname, categoryconf.collections.category, query, options, function(result){
    result = "{ success: " + result + " }";
    _returnJSON(context, result);
  });
};

var _returnJSON = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};

exports.test = function(context){
  context.contentType = $mime.html;  
  $view.render(context, categoryconf.views.test);
};
