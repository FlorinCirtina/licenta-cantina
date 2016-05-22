'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
// var User = mongoose.model('User');

module.exports.init = function(app) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    //User.findById(id, done);
    done(null, user);
  });

  // load strategies
  // require('./strategies/local')();
  // require('./strategies/facebook')();
};
