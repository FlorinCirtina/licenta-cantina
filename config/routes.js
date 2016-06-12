'use strict';

module.exports.init = function(app) {
	let routesPath = app.get('root') + '/server/routes';
	app.use('/', require(routesPath + '/auth'));
	app.use('/api', require(routesPath + '/users'));
	app.use('/api', require(routesPath + '/categories'));
	app.use('/api', require(routesPath + '/products'));
	app.use('/api', require(routesPath + '/orders'));
}