var fs = require("fs");
var ext = '.json';
var folderPath = __appPath + '/json/';

exports.init = function () {
};

exports.pushtile = function(context){  
  var path = folderPath + context.data.tilename + ext;
  _write(path, context.data.tiledata);
};

var _write = function(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) throw err;
  });
};

exports.current = function(context){
  var filePath = folderPath + context.params[0] + ext;
  
  if(__util.isValidFile(filePath)){
    var content = fs.readFileSync(filePath);
    _returnJSON(context, content);
  }
  else{
    context.notfound();
  }
};

var _returnJSON = function(context, result){
  context.contentType = $mime.json;
  context.output = result;
  context.next();
};