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
    
    if (!doc) {
      res.json(doc);
    } else {
      res.json("Sorry, but we already have an account for this email!");
    }
  });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: false
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/dashboard',
  failureRedirect : '/',
  failureFlash : false
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
      
      Profile.findOne({ 'local.email' : email }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, false, console.log("signup taken"));

        } else {

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
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  
  function(req, email, password, done) { 
    console.log("inside login");

    Profile.findOne({ 'local.email' :  email }, function(err, user) {
      
      if (err) return done(err);

      if (!user) return done(null, false, console.log("no user found"));

      if (!user.validPassword(password)) return done(null, false, console.log("wrong password"));

      return done(null, user);
    });
  })
);

module.exports = router;