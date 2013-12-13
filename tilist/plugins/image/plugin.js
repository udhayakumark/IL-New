var imageConf;
var query = {};
var options = {};

exports.init = function () {
  imageConf = __conf.get("image");
};

exports.upload = function (context){
  context.data.name = _upload(context);
  
  if(!__util.isNullOrEmpty(context.data.name)){
    $db.save(imageConf.dbname, imageConf.collections.image, context.data, function(result){
      result = "{ _id: " + result + " }";
      _returnJson(context, result);
    });
  }
  else{
    _returnJson(context, "{ _id: 0 }");
  }
};

exports.get = function (context){    
  query = context.data;
    
  $db.select(imageConf.dbname, imageConf.collections.image, query, options, function(result){  	
    _returnJson(context, result);
  });
};

exports.remove = function (context){
  query = context.data;
  
  $db.remove(imageConf.dbname, imageConf.collections.image, query, options, function(result){
    result = "{ success: " + result + " }";
    _returnJson(context, result);
  });
};

var _upload = function(context){
  if (context.files && !__util.isNullOrEmpty(context.files.image) && !__util.isNullOrEmpty(context.files.image.name)){  
    var fileName = __util.replaceEmpty(context.files.image.name);
    var imagePath = __appPath + imageConf.imgfolderpath + context.data.type + '/';
    
    __util.fileUpload(context.files.image, imagePath, fileName, function(error){
      if(error){}
    });
    
    return fileName;
  }
  return '';
};

var _returnJson = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};
