'use strict';

const passport = require('passport');

/**
 * Module exports
 */
module.exports.ensured = ensureAuthenticated
module.exports.bearer = bearerAuthentication;

/**
 *  Checks if a user is authenticated or not
 */
function ensureAuthenticated(req, res, next) {
	console.log('HERE');
	console.log('req.isAuthenticated()', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
}

function bearerAuthentication(req, res, next) {
  return passport.authenticate('bearer', { session: false });
}
