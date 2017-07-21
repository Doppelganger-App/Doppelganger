var LocalStrategy = require('passport-local').Strategy;
var Profile = require('../models/profile.js');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log("serialized");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Profile.findById(id, function(err, user) {
      console.log("deserialized");
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, username, password, done) {
    process.nextTick(function() {
      //Checking to see if the username is already taken
      Profile.findOne({ 'local.username' : username }, function(err, user) {
        if (err) return done(err);

        if (user) {

          return done(null, false, req.flash('signupMessage', 'This username is already taken.'));

        } else {

          //if there is no user with that username, create the user
          var newProfile = new Profile();
          newProfile.local.username = username;
          newProfile.local.password = newProfile.generateHash(password);

          newProfile.save(function(err) {
            if (err) throw err;
            return done(null, newProfile);
          });
        }
      });
    });
  }));
}