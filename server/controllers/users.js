'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 *  Module exports
 */
module.exports.update = update;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.changePassword = changePassword;
module.exports.jsonUser = jsonUser;

function update(req, res, next) {
  let user = req.resources.user;
  let body = _.pick(req.body, ['name', 'email', 'legNumber']);
  Object.assign(user, body);

  user.save( (err, result) => { 
    if (err) {
      return next(err);
    }
    req.resources.user = result;
    next();
  });
}

function changePassword(req, res, next) {
  var user = new User(req.user);
  var passwordObject = _.pick(req.body, 'oldPassword', 'newPassword', 'confirmPassword');

  if(passwordObject.newPassword !== passwordObject.confirmPassword) {
    var PassNoMatchError = new Error('New password does not match confirm password.');
    PassNoMatchError.type = 'New password does not match confirm password.';
    return next(PassNoMatchError);
  }

  user.changePassword(passwordObject.oldPassword, passwordObject.newPassword, function(err, data){
    if(err) {
      return next(err);
    }

    if(!data) {
      return next(err);
    };

    req.resources.user = data;
    next();
  });
}

function getUsers(req, res, next) {
  User.find({}, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.user = result;
    next();
  });
}

function getUserById(req, res, next) {
  let userId = req.params.id;
  User.findById(userId, (err, result) => {
    if (err) {
      return next(err);
    }
    req.resources.user = result;
    next();
  });
}

function jsonUser(req, res, next) {
  res.json(req.resources.user);
}
