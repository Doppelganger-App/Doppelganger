$(document).ready(function() {

  $('#getUser').on('click', function(event) {
    event.preventDefault();
    localStorage.setItem('email', $('#email').val().trim());
    localStorage.setItem('signup', false);
    $('#sessionLogin').click();
  });
  
  $(".button-collapse").sideNav();
});