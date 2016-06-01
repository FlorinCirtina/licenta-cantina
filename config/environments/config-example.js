'use strict';

module.exports = {
  port: 8080,
  hostname: "127.0.0.1",
  baseUrl: 'http://localhost:8080',
  mongodb: {
    uri: "mongodb://localhost/lic-cantina"
  },
  app: {
    name: "cantina"
  },
  serveStatic: true,
  session: {
    secret: 'On#MustNotGiv3S#cretsAwAy!2any1',
    type: 'mongo',                          // store type, default `memory`
    resave: false,                            // save automatically to session store
    saveUninitialized: true                   // save new sessions
  },
  moment: {
    locale: 'en'
  },
  assets: {
    url: 'http://localhost:3000/files'        // or http://*.cloudfront.net
  }
};
