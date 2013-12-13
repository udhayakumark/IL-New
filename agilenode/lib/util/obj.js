exports.isValid = function(obj) { return _isValid(obj); }
exports.getType = function(obj) { return getType(obj); }

var _isValid = function(obj) {
  if(obj == null
      || _getType(obj) === 'undefined') {
	return false;
  }
  return true;
}

var _getType = function(obj) {
  return Object.prototype.toString.call(obj);
}
