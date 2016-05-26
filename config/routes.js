'use strict';

module.exports.init = function(app) {
	let routesPath = app.get('root') + '/server/routes';
	app.use('/', require(routesPath + '/test'));
	app.use('/', require(routesPath + '/auth'));
}