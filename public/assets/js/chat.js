$(document).ready(function() {
  var room = localStorage.getItem('room');
  var user = localStorage.getItem('username');
  var socket = io();

  //Page set up
  signInUser();
  
  $('#currentUserName').text("Welcome, " + user);
  
  //side-navbar on small screen
  $(".button-collapse").sideNav();

  //Chat Code
  socket.on('connect', function() {
    socket.emit('room', room);
  });

  socket.emit('join', user);

  $('#newMessage').keyup(function(event) {
    if (event.keyCode === 13) {
      $('#submitMessage').click();
    }
  });

  $('#submitMessage').on('click', function(event) {
    event.preventDefault();
    var newMessage = $('#newMessage').val().trim();
    var msgObject = {
      author: user,
      message: newMessage
    }

    if (newMessage !== "") {
      $('#newMessage').val("");
      Materialize.updateTextFields();
      socket.emit('chat message', msgObject);

      $.ajax({
        type: "PUT",
        url: "/api/entermessage/" + room,
        data: msgObject
      }).done(function(data) {
        console.log(data);
      });

    } else {
      Materialize.toast("Write a message before sending!", 3000);
    }
  });

  socket.on('join', function(user) {
    getGroupInfo();
    Materialize.toast(user + " joined!", 3000);
  });

  socket.on('chat message', function(msg) {
    var row = $('<div>');
    row.addClass('row');

    var bubdiv = $('<div>');

    var auth = $('<h6>');
    auth.text(msg.author);

    var worddiv = $('<div>');
    worddiv.addClass('worddiv');

    var bubble = $('<p>');
    bubble.text(msg.message);
    bubble.addClass('bubble');

    if (msg.author === user) {
      bubdiv.addClass('col s7 offset-s5 right-align');
      worddiv.css('background-color', '#00695c').css('color', '#fafafa');
      worddiv.append(bubble);
      bubdiv.append(worddiv);
      row.append(bubdiv);
    } else {
      bubdiv.addClass('col s7');
      worddiv.css('background-color', '#cfd8dc');
      worddiv.append(bubble);
      bubdiv.append(auth).append(worddiv);
      row.append(bubdiv);
    }

    $('#chatbox').append(row);
    $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
  });

  socket.on('exit', function(user) {
    getGroupInfo();
    Materialize.toast(user + " left.", 3000);
  });

  $(window).on('beforeunload', function() {
    $.ajax({
      type: "PUT",
      url: "/api/exitgroup/" + room + "/" + user
    }).done(function(data) {
      console.log(data);
      socket.emit('exit', user);
    });
  });

  function signInUser() {
    $.ajax({
      type: "PUT",
      url: "/api/entergroup/" + room + "/" + user
    }).done(function(data) {
      console.log(data);
      getGroupInfo(); 
    });
  }

  function getGroupInfo() {
    $.get("/api/groupinfo/" + room, function(data) {
      console.log(data);
      $('#groupName').text(data.name);
      $('#topics').text('Topics: ' + data.topics.toString().replace(/,/g, ", "));
      $('#memberCollection').empty();

      if (data.member_names.length === 1) {
        var li = $('<li>');
        li.addClass('collection-item');
        li.text("No other members yet.");
        $('#memberCollection').append(li);
        
      } else {

        for (var i = 0; i < data.member_names.length; i++) {
          if (data.member_names[i].name !== user) {
            var li = $('<li>');
            li.addClass('collection-item');
            li.text(data.member_names[i].name);

            var icon = $('<i>');
            if (data.member_names[i].present) {
              icon.addClass('material-icons secondary-content present');
              icon.text('person');
            } else {
              icon.addClass('material-icons secondary-content absent');
              icon.text('perm_identity');
            }

            li.append(icon);
          }

          $('#memberCollection').append(li);
        }
      }

      for (var i = 0; i < data.messages.length; i++) {
        var row = $('<div>');
        row.addClass('row');

        var bubdiv = $('<div>');

        var auth = $('<h6>');
        auth.text(data.messages[i].author);

        var worddiv = $('<div>');
        worddiv.addClass('worddiv');

        var bubble = $('<p>');
        bubble.text(data.messages[i].message);
        bubble.addClass('bubble');

        if (data.messages[i].author === user) {
          bubdiv.addClass('col s7 offset-s5 right-align');
          worddiv.css('background-color', '#00695c').css('color', '#fafafa');
          worddiv.append(bubble);
          bubdiv.append(worddiv);
          row.append(bubdiv);
        } else {
          bubdiv.addClass('col s7');
          worddiv.css('background-color', '#cfd8dc');
          worddiv.append(bubble);
          bubdiv.append(auth).append(worddiv);
          row.append(bubdiv);
        }

        $('#chatbox').append(row);
        $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
      }
    }); 
  }
});