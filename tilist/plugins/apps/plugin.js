var appsconf;
var query = {};
var options = {};

exports.init = function() {
  appsconf = __conf.get("apps");
};

exports.save = function(context) { 
  var apps = JSON.parse(context.data.form_data);
  
  $db.save(appsconf.dbname, appsconf.collections.apps, apps, function(result){
    apps = {};
    apps._id = result;
    $general.returnJSON(context, apps);
  });   
};

exports.list = function(context) { 	
  query = {}; 
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  } 
  
  $db.select(appsconf.dbname, appsconf.collections.apps, query, options, function(result){
     $general.returnJSON(context, result);
  });
};