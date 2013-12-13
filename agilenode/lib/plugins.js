var defaultPath;
var appPluginPath;
var pluginFile = 'plugin.js';

exports.init = function() {
  appPluginPath = __util.validPath(__appPath + 'plugins');
  console.log('Application plugins path: ' + appPluginPath);
  defaultPath = __conf.appConf().agileNodePath + 'plugins/';
  console.log('Default plugin path: ' + defaultPath);
  _.each(__conf.get('plugins'), function(name, alias) {
    _load(name, alias);
  });
};

var _load = function(name, alias) {
  if(__util.isNullOrEmpty(name) &&
      __util.isNullOrEmpty(alias)) {
    return;
  }
  console.log('Loading plugin ' + name + 'with name $' + alias);
  var plugin = _getPlugin(name);
  if(plugin) {
    console.log('Plugin ' + alias + 'available. Now Loading the plugin conf....');
    __conf.load(alias);
    console.log('Initializing the plugin ' + alias + '....');
    plugin.init(alias);
    global['$' + alias] = plugin;
    console.log('Plugin ' + name + 'loaded available with name $' + alias);
  
  }
};

var _getPlugin = function(name) {
  var plugin = _reqPlugin(appPluginPath, name);
  if(!__util.isValidObject(plugin)) {
    plugin = _reqPlugin(defaultPath, name);
  }
  return plugin;
};

var _reqPlugin = function(path, name) {
  var pluginPath = path + name;
  if(__util.isValidPath(pluginPath)) {
    var pluginFilePath = __util.filePath(pluginPath, pluginFile);
    if(pluginFilePath) {
      return require(pluginFilePath);
    }
  }
  return null;
}; 
