/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var passport = require("passport");
var pass = require("./auth/handler/passport")(passport);
var server = require('http').createServer(app);
require('./config/express')(app, passport);
require('./routes')(app, passport);

// Start server
server.listen(config.port, config.ip, function(){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;