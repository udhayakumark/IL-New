var urlconf;
var query = {};
var options = {};

exports.init = function () {
  urlconf = __conf.get("urls");
};

exports.save = function(context){ 
  $db.save(urlconf.dbname, urlconf.collections.urls, context.data, function(result){
    result = "{ _id: " + result + " }";
    _returnJSON(context, result);
  });   
};

exports.get = function (context){ 	
  query = context.data;  
  
  $db.select(urlconf.dbname, urlconf.collections.urls, query, options, function(result){
     _returnJSON(context, result);
  });
};

exports.remove = function (context){
  query = context.data; 	
  
  $db.remove(urlconf.dbname, urlconf.collections.urls, query, options, function(result){
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
  $view.render(context, urlconf.views.test);
};
