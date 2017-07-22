$(document).ready(function() {

  $('#registerUser').on('click', function(event) {
    event.preventDefault();
    var userObject = {
      username: $('#username').val().trim(),
      email: $('#email').val().trim(),
      politics: $('input[name="political view"]:checked').val(),
      background: $('input[name="background"]:checked').val()
    }
    console.log(userObject);

    $.post('/user/check', userObject, function(data) {
      if (data) {
        alert(data);
      } else {
        localStorage.setItem('username', userObject.username);
        localStorage.setItem('email', userObject.email);
        localStorage.setItem('politics', userObject.politics);
        localStorage.setItem('background', userObject.background);
        localStorage.setItem('signup', true);
        $('#signInUser').click();
      }
    });
  });
});