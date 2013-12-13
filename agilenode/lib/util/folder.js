var path = require('path');
var fs = require('fs');

exports.getValid = function(folder) {
  if(!__util.strEndsWith(folder, path.sep)) {
    folder = folder + path.sep;
  }
  if(_isValid(folder)) {
    return folder;
  }
  return null; 
};

exports.isValid = function(folder) {
  return _isValid(folder);
};

exports.createIfNot = function(folderPath){
  if(!_isValid(folderPath)){
    fs.mkdirSync(folderPath);
  }
};

var _isValid = function(folder) {
  return fs.existsSync(folder);
};
