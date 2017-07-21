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
  res.sendFile(path.join(__dirname, "../public/user_page_design.html"));
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log("isLoggedIn function running");
    
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;