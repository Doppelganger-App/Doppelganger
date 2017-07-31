var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var htmlRoutes = require("./controllers/html_routes.js")
var apiRoutes = require("./controllers/api_routes.js");
var loginRoutes = require("./controllers/login_routes.js");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var PORT = process.env.PORT || 3000;
var mongoose = require("mongoose");
mongoose.Promise = Promise;

var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.use(express.static(path.join(__dirname + "/public")));

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Use this for test: "mongodb://localhost/dgtdb"
// Use this when ready to deploy: process.env.MONGODB_URI
mongoose.connect("mongodb://localhost/dgtdb", { useMongoClient: true });
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(session({
  secret: 'doppleuser',
  resave: true,
  saveUninitialized: true,
})); // session secret
app.use(passport.initialize());
app.use(passport.session());


app.use("/", htmlRoutes)
app.use("/api/", apiRoutes);
app.use("/user/", loginRoutes);



io.on('connection', function(socket) {
  console.log('a user connected');
  var userRoom;

  socket.on('room', function(room) {
    userRoom = room;
    console.log("set room to " + userRoom);
    socket.join(room);
  });

  socket.on('join', function(user) {
    console.log(user);
    socket.broadcast.to(userRoom).emit('join', user);
  });

  socket.on('chat message', function(msg) {
    console.log(msg);
    io.to(userRoom).emit('chat message', msg);
  });

  socket.on('exit', function(user) {
    socket.broadcast.to(userRoom).emit('exit', user);
  });

  socket.on('disconnect', function() {
    socket.leave(userRoom);
    console.log('user disconnected');
  });
});

http.listen(PORT, console.log("Listening on port: " + PORT));