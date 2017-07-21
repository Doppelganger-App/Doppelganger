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
      if (data === "Sorry, but you already have an account!") {
        alert(data);
      } else {
        console.log(data);
        localStorage.setItem('email', data.local.email);
        $('#signInUser').click();
      }
    });
  });
});