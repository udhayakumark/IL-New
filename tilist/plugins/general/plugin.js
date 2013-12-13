
exports.init = function () {
};

exports.upload = function(context, imageFolder){
  if (context.files){
    for(var property in context.files) {
      var file = context.files[property];
      var fileName = __util.replaceEmpty(file.name);
      var imagePath = imageFolder.replace('{0}', property.toLowerCase());
      
      __util.fileUpload(file, imagePath, fileName, function(error){
        if(error){}
      });
    
      var addProp = 'context.data.' + property + ' = "' + fileName + '";';
      eval(addProp);
    }
    return context;
  }
};

exports.returnJSON = function(context, result){
  context.contentType = $mime.json;
  context.output = JSON.stringify(result);
  context.next();
};