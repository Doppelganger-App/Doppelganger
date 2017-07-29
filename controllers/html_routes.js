var path = require("path");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/dashboard", isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/user.html"));
});

router.get("/discuss", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});

function isLoggedIn(req, res, next) {
  console.log("isLoggedIn function running");
    
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;