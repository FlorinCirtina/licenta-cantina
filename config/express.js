'use strict';
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

var expressValidator = require('express-validator');

module.exports.init = function(app) {
/**
   * Common express configs
   */
  app.use(expressValidator());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.disable('x-powered-by');
  app.use(morgan('dev')); // log every request to the console
}
