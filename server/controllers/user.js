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
module.exports.jsonUser = jsonUser;

function update(req, res, next) {
  let user = req.resources.user;
  let body = _.pick(req.body, ['name']);
  Object.assign(user, body);

  user.save( (err, result) => { 
    if (err) {
      return next(err);
    }
    req.resources.user = result;
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
