var mongo = require("mongodb");

exports.exec = function(dbname, table, query, options, fn, cb, data) {
  var connection = _createConnection(dbname);	
  
  connection.open(function(error, db){
    if(error){
  	  $log.critical(error.stack);
      return;
    }
    
    db.collection(table, function(error, collection){
      if(error){
        cb(error);
      }
      
      fn(collection, query, options, function(error, result){
      	if(error) {
          cb(error);
      	}
      	
      	db.close();
      	cb(null, result);
      }, data);
    });
  });
};

exports.save = function(collection, query, options, cb, data) {
  if(_validateId(data._id)){
    data._id = new mongo.ObjectID(data._id);
  }
  else{
    delete data["_id"];
  }
  
  collection.save(data, {safe:true}, function(error, doc) {
    if (error) {
      cb(error);
    }
    
    if(!__util.isNullOrEmpty(doc._id)){
      cb(null, doc._id);
    }
    else{
      cb(null, data._id);
    }
  });  
};

exports.select = function(collection, query, options, cb) {
  if(typeof query._id == "object"){
    var $in = [];

    _.each(query._id, function(id){
      $in.push(mongo.ObjectID(id));
    });

    query._id = {};
    query._id.$in = $in;
  }
  else if(_validateId(query._id)){
    query._id = new mongo.ObjectID(query._id);
  }
  
  collection.find(query, options).toArray(function (error, result) {
    if (error) { 
      cb(error);
    }
    
    cb(null, result);
  });
};

exports.remove = function(collection, query, options, cb) {
  if(_validateId(query._id))
  {
    query._id = new mongo.ObjectID(query._id);
  }
  
  collection.remove(query, options, function (error) {
    if (error) { 
      cb(error);
    }
    
    cb(null, true);
  });
};

exports.update = function(collection, query, options, cb, data) {
  try{
    if(_validateId(query._id)) {
      query._id = new mongo.ObjectID(query._id);
    }   
    delete data["_id"];
    collection.update(query, { $set: data }, options);
    
    if(__util.isNullOrEmpty(options.multi)) {
      cb(null, data._id);
    }
    else{
      cb(null, true);
    }
  }
  catch(e){
    cb(e, false);   
  }
};

var _createConnection = function (dbname) {
  var appconf = __conf.get('app');
  
  var server = new mongo.Server(appconf.dbhost, mongo.Connection.DEFAULT_PORT, {});
  var db = new mongo.Db(dbname, server, {});
  
  return db;
};

var _validateId = function (id){
  if(!__util.isNullOrEmpty(id) && (id.length == 12 || id.length == 24)) {
    return true;
  }
     
  return false;
};
