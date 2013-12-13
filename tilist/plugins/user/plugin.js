var users = require("./users.js");
var userconf;
var query = {};
var options = {};
var user = {};

exports.init = function() {
  userconf = __conf.get("user");
};

exports.save = function(context) {
  user = JSON.parse(context.data.form_data);
  user.password = users.encrypt(user.password);
	 
  $db.save(userconf.dbname, userconf.collections.orgmembers, user, function(result){
    user = {};
    user._id = result;
    $general.returnJSON(context, user);
  });
};

exports.list = function(context) {   
  query = {}; 
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  }
    
  $db.select(userconf.dbname, userconf.collections.orgmembers, query, options, function(result){  	
    $general.returnJSON(context, result);
  });
};

exports.login = function(context) {
  user = JSON.parse(context.data.form_data);
  user.password = users.encrypt(user.password);

  query = user;
	
  $db.select(userconf.dbname, userconf.collections.orgmembers, query, options, function(result){
  	user = {};
    var returnVal = {};
    returnVal.userfound = false; 	
  	
    try{
      if(result.length > 0){
        returnVal.userfound = true;
        var sid = $session.create();
        $session.set("user", result[0], sid);
        
        user.sId = sid;
        user.name = result[0].name;
        user.email = result[0].email;  
        user.isAdmin = result[0].isAdmin;
        
        context.setCookie = 'user=' + JSON.stringify(user) + ';path=/';
      }
    }
    catch(e){
      $log.error('logged user error: ' + e);
    }
  	
    $general.returnJSON(context, returnVal);
  });
};

exports.getList = function(userIds, cb) {
  query._id = userIds;
  
  $db.select(userconf.dbname, userconf.collections.orgmembers, query, options, function(result){  	
    cb(result);
  });
};
