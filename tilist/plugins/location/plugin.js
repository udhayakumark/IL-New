var locationconf;
var query = {};
var options = {};

exports.init = function() {
  locationconf = __conf.get("location");
};

exports.save = function(context){ 
  var location = JSON.parse(context.data.form_data);
  
  $db.save(locationconf.dbname, locationconf.collections.location, location, function(result){
    location = {};
    location._id = result;
    $general.returnJSON(context, location);
  });   
};

exports.list = function(context) { 	
  query = {};
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  }  
  
  $db.select(locationconf.dbname, locationconf.collections.location, query, options, function(result){
     $general.returnJSON(context, result);
  });
};