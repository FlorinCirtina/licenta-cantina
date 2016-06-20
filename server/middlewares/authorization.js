'use strict';

/**
 * Module exports
 */
module.exports.isAdmin = isAdmin

/**
 *  Checks if a user is authenticated or not
 */
function isAdmin(req, res, next) {
	let user = req.user;

	if(user.role != 'admin') {
  	res.status(401).json({ message: 'Unauthorized. You must be an admin' });
	}

}

function bearerAuthentication(req, res, next) {
  return passport.authenticate('bearer', { session: false });
}
