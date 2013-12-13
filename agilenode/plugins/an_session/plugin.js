var session = require('session');
var newSession, manageSession;
var sessionTimeOut = 60 * 30; //default session timeout 30 mins

exports.init = function () {
  conf = __conf.get('app');
	
  if(!__util.isNullOrEmpty(conf.sessionTimeOut)){
    sessionTimeOut = 60 * conf.sessionTimeOut;
  }
  
  manageSession = new _manager();
};

exports.create = function(){
 newSession = manageSession.create();
 newSession.save();
 
 return newSession.getId();
};

exports.set = function(key, value, sid){
  if(sid){
    newSession = manageSession.open(sid);
    newSession.set(key, value);
    newSession.save();
  }
};

exports.get = function(key, sid){
  newSession = manageSession.open(sid);
  var value = newSession.get(key);
  newSession.save();
  
  return value;
};

exports.destroy = function(sid){
 newSession = manageSession.open(sid);
 manageSession.destroy(newSession);
};

var _manager = function(options) {
  options = options || {};
  options.debug = options.debug == undefined ? true : options.debug;
  options.expiration = sessionTimeOut;
  
  var manager = new session.Manager(options);
  return manager;
}
