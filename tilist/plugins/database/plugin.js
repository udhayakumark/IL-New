var db = require("./db.js");

exports.init = function(){
};

exports.save = function(dbname, table, data, cb){
  db.exec(dbname, table, null, null, db.save, function(error, result){
    if(error){
      $log.error(error.stack);	
    }
  	
    cb(result);
  }, data);
};

exports.select = function(dbname, table, query, options, cb) {
 db.exec(dbname, table, query, options, db.select, function(error, result){
    if(error){
      $log.error(error.stack);	
    }
    
    cb(result);
  });
};

exports.remove = function(dbname, table, query, options, cb) {
  db.exec(dbname, table, query, options, db.remove, function(error, result){
    if(error){
      $log.error(error.stack);	
    }
    
    cb(result);
  });
};

exports.update = function(dbname, table, query, options, data, cb){
  db.exec(dbname, table, query, options, db.update, function(error, result){
    if(error){
      $log.error(error.stack); 
    }
   
    cb(result);
  }, data);
};
