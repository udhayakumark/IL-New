var args = require('./util/args.js');
var str = require('./util/str.js');
var obj = require('./util/obj.js');
var file = require('./util/file.js');
var folder = require('./util/folder.js');

//Object functions
exports.isValidObject = function(item) { return obj.isValid(item); };
exports.objectType = function(obj) { return obj.getType(obj); };

//String functions
exports.strEndsWith = function(target, search) { return str.endsWith(target, search); };
exports.isNullOrEmpty = function(target) {return str.isNullOrEmpty(target); };
exports.replaceEmpty = function(target) { return str.replaceEmpty(target); };

//file Functions
exports.isValidFile = function(filePath) { return file.isValid(filePath); };
exports.filePath = function(path, fileName) { return file.filePath(path, fileName); };
exports.fileUpload = function(uploadFile, targetPath, fileName, cb) { folder.createIfNot(targetPath); 
        file.upload(uploadFile, targetPath + fileName, function(err) { if (err) { cb(err); } }); };
exports.fileUploadSync = function(uploadFile, targetPath, fileName) { folder.createIfNot(targetPath); 
        file.uploadSync(uploadFile, targetPath + fileName); };

//folder functions
exports.validPath = function(path) { return folder.getValid(path); };
exports.isValidPath = function(path) { return folder.isValid(path); };

