// var express = require("express");
// var passport = require("passport");
// var router = express.Router();

// router.get('/signup', function(req, res) {
//   res.json({message: req.flash('signupMessage')});
// });

// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/',
//   failureFlash: true
// }));

// module.exports = router;

module.exports = function(app, passport) {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }));
}