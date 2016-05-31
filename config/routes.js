'use strict';

module.exports.init = function(app) {
	let routesPath = app.get('root') + '/server/routes';
	app.use('/', require(routesPath + '/auth'));
	app.use('/', require(routesPath + '/user'));
}