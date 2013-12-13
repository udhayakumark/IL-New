var eventsconf;
var query = {};
var options = {};

exports.init = function () {
  eventsconf = __conf.get("events");
};

exports.save = function(context){ 
  $db.save(eventsconf.dbname, eventsconf.collections.event, context.data, function(result){
    result = "{ _id: " + result + " }";
    _returnJSON(context, result);
  });   
};

exports.get = function (context){ 	
  query = context.data;  
  
  $db.select(eventsconf.dbname, eventsconf.collections.event, query, options, function(result){
     _returnJSON(context, result);
  });
};

exports.remove = function (context){
  query = context.data; 	
  
  $db.remove(eventsconf.dbname, eventsconf.collections.event, query, options, function(result){
    result = "{ success: " + result + " }";
    _returnJSON(context, result);
  });
};

exports.test = function(context){
  context.contentType = $mime.html;  
  $view.render(context, eventsconf.views.test);
};

var _returnJSON = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};
