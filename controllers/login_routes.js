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

// module.exports = function(app, passport) {
//   app.post('/signup', passport.authenticate('local-signup', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/',
//     failureFlash: true
//   }));
// }

var path = require("path");
var express = require("express");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var Profile = require('../models/profile.js');
var router = express.Router();

router.post('/check', function(req, res) {
  console.log(req.body);
  Profile.findOne({ 'local.email': req.body.email }, function(err, doc) {
    if (err) throw err;
    console.log(doc);
    // res.json(doc);
    if (!doc) {
      res.json(doc);
    } else {
      res.json("Sorry, but we already have an account for this email!");
    }
  });
  // res.json("thanks");
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: false
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/dashboard', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
  failureFlash : false // allow flash messages
}));

router.get('/logout', function(req, res) {
  console.log("inside logout");
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function(user, done) {
  console.log("serialized id: " + user.id)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Profile.findById(id, function(err, user) {
    console.log("deserialized id: " + id)
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {
    process.nextTick(function() {
      // Checking to see if the username is already taken
      Profile.findOne({ 'local.email' : email }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, false, console.log("signup taken"));

        } else {

          //if there is no user with that username, create the user
          var newProfile = new Profile();
          newProfile.local.email = email;
          newProfile.local.password = newProfile.generateHash(password);

          newProfile.save(function(err, doc) {
            if (err) throw err;
            console.log(doc);
            return done(null, newProfile);
          });
        }
      });
    });
  })
);

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  
  function(req, email, password, done) { // callback with email and password from our form
    console.log("inside login");
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Profile.findOne({ 'local.email' :  email }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) return done(err);

      // if no user is found, return the message
      if (!user) return done(null, false, console.log("no user found")); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password)) return done(null, false, console.log("wrong password")); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });
  })
);

module.exports = router;