$(document).ready(function() {
  $('.login_form').submit(function(event) {
    var email = $('.login_email').val();
    var pass = $('.login_password').val();
    var data = {'email': email, 'password': pass};
    $.post('/user/login', data, function(res) {
      console.log(res);
    });
    return false;
  });
});
