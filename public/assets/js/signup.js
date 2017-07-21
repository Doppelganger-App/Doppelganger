$(document).ready(function() {

  $('#registerUser').on('click', function(event) {
    event.preventDefault();
    var userObject = {
      username: $('#username').val().trim(),
      email: $('#email').val().trim()
    }
    console.log(userObject);

    $.post('user/check', userObject, function(data) {
      if (data) {
        alert(data);
      } else {
        localStorage.setItem('username', userObject.username);
        $('#signInUser').click();
      }
    });
  });
});