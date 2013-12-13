var fs = require('fs');

exports.isValid = function(path) {
  return _isValid(path);
};

exports.filePath = function(path, file) {
  return _filePath(path, file);
};

exports.upload = function(file, targetPath, cb) {
  fs.rename(file.path, targetPath, function(error) {
    if (error) {
      console.log(error);
    }
  });
};

exports.uploadSync = function(file, targetPath) {
  fs.renameSync(file.path, targetPath);
};

var _filePath = function(path, file) {
  path = __util.validPath(path);
  var filePath = path + file;
  if(_isValid(filePath)) {
    return filePath;
  }
  return null;
};

var _isValid = function(path) {
  return fs.existsSync(path)
};
