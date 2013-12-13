var orgunitsconf;
var query = {};
var options = {};

exports.init = function () {
  orgunitsconf = __conf.get("orgunits");
};

exports.save = function(context){ 
  $db.save(orgunitsconf.dbname, orgunitsconf.collections.orgunits, context.data, function(result){
    result = "{ _id: " + result + " }";
    _returnJSON(context, result);
  });   
};

exports.get = function (context){ 	
  query = context.data;  
  
  $db.select(orgunitsconf.dbname, orgunitsconf.collections.orgunits, query, options, function(result){
     _returnJSON(context, result);
  });
};

exports.remove = function (context){
  query = context.data;	
  
  $db.remove(orgunitsconf.dbname, orgunitsconf.collections.orgunits, query, options, function(result){
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
  $view.render(context, orgunitsconf.views.test);
};
