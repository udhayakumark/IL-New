var organizationconf;
var query = {};
var options = {};

exports.init = function () {
  organizationconf = __conf.get("organization");
};

exports.save = function(context){ 
  var organization = JSON.parse(context.data.form_data);
  
  $db.save(organizationconf.dbname, organizationconf.collections.organization, organization, function(result){
    organization = {};
    organization._id = result;
    $general.returnJSON(context, organization);
  });   
};

exports.list = function (context){ 	
  query = {}; 
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  }  
  
  $db.select(organizationconf.dbname, organizationconf.collections.organization, query, options, function(result){
     $general.returnJSON(context, result);
  });
};