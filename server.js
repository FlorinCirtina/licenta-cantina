// set up ========================
var ENV = process.env.NODE_ENV || 'development';

var express  = require('express');
var app      = express();                       
var config = require('./config');
var http = require('http');
var server;


/**
 * Set express (app) variables
 sss
 */
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);


require('./config/mongoose').init(app);
require('./config/models').init(app);
require('./config/passport').init(app);
require('./config/express').init(app);
require('./config/routes').init(app);
app.use(express.static(__dirname + '/public'));    

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
/**
 * Start the app if not loaded by another module
 */
if (!module.parent) {
  server = http.createServer(app);

  server.listen(config.port || 3000, config.hostname || 'localhost', function() {
    var addr = server.address();
    console.log(
      '%s is running, listening on %s:%s, environment: %s',
      config.app.name,
      addr.address,
      addr.port,
      ENV.toLowerCase()
    );
  });
}
