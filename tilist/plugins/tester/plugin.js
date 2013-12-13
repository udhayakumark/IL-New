exports.init = function() {
  $log.info('Initiating the tester plugin');
};

exports.test = function(context) {
  $log.info('Executing default test render');
  context.output = 'This is test plugin rendering';
};
