$(document).ready(function() {
  var room = localStorage.getItem('room')
  // console.log(nsp);
  var socket = io();

  socket.on('connect', function() {
    socket.emit('room', room);
  });

  var user = localStorage.getItem('username');
  console.log(user);

  socket.emit('join', user);

  $('#submitMessage').on('click', function(event) {
    event.preventDefault();
    var newMessage = $('#newMessage').val().trim();
    var msgObject = {
      author: user,
      message: newMessage
    }

    if (newMessage !== "") {
      console.log(newMessage);
      $('#newMessage').val("");
      Materialize.updateTextFields();

      //socket emit
      socket.emit('chat message', msgObject);
    } else {
      Materialize.toast("Write a message before sending!", 3000);
    }
  });

  socket.on('join', function(user) {
    Materialize.toast(user + " is here and ready to chat!", 3000);
  });

  socket.on('chat message', function(msg) {
    console.log(msg);
    $('#chatbox').append($('<p>').text(msg.author + ": " + msg.message));
  });

  socket.on('exit', function(user) {
    Materialize.toast(user + " has gone offline.", 3000);
  });

  $(window).on('beforeunload', function() {
    socket.emit('exit', user);
  });
});