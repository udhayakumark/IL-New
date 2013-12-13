
exports.init = function() {
	
};

exports.static = function(context) {
  $view.static(context);
};

exports.validateSession = function(context) {
  if(__util.isNullOrEmpty(context.cookie.SID)) {
    $users.login(context);
  }
  else{
    $session.get('userobj', context.cookie.SID);
  }
};
