var tileConf;
var query = {};
var options = {};

exports.init = function () {
  tileConf = __conf.get("tile");
};

exports.save = function (context){  
  _save(context, tileConf.collections.tile);  
};

exports.list = function (context){    
  query = {};
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  }
    
  $db.select(tileConf.dbname, tileConf.collections.tile, query, options, function(result){
    if(result.length > 0){
      var userIds = _getUserIds(result);
  	  	
      $user.getList(userIds, function(users){
        var list = {};
        _.each(users, function(user){
          list[user._id] = user.name;
        });
    	
        _.each(result, function(tile){
          tile.userName = list[tile.userId];
        });
      
        $general.returnJSON(context, result);
      });
    }
    else{
      $general.returnJSON(context, result);
    }
  });
};

exports.saveBlock = function (context){
  _save(context, tileConf.collections.tileBlocks);
};

exports.blockList = function (context){
  query = {};
  if(!__util.isNullOrEmpty(context.data.form_data)){
    query = JSON.parse(context.data.form_data);
  }
    
  $db.select(tileConf.dbname, tileConf.collections.tileBlocks, query, options, function(result){  	
    $general.returnJSON(context, result);
  });
};

var _save = function(context, table){
  var obj = JSON.parse(context.data.form_data);
  
  $db.save(tileConf.dbname, table, obj, function(result){
    obj = {};
    obj._id = result;
    $general.returnJSON(context, obj);
  });  
};

var _getUserIds = function(tiles) {
  var userIds = [];
  _.each(tiles, function(tile){
    userIds.push(tile.userId);
  });
  
  return userIds;
};
