var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var htmlRoutes = require("./controllers/html_routes.js")
var apiRoutes = require("./controllers/api_routes.js");
var PORT = process.env.PORT || 3000;
var mongoose = require("mongoose");
mongoose.Promise = Promise;

var app = express();

app.use(express.static(path.join(__dirname + "/public")));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Use this when ready to deploy: process.env.MONGODB_URI
mongoose.connect("mongodb://localhost/dopplegangerdb");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use("/", htmlRoutes)
app.use("/api/", apiRoutes);

app.listen(PORT, console.log("Listening on port: " + PORT));