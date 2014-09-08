/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var place = require('./api/place/place.controller');
var nearby = require('./api/nearby/nearby.controller');
var search = require('./api/search/search.controller');
module.exports = function(app, passport){

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/activity', isLoggedIn, require('./api/activity'));
  app.use('/api/followers', isLoggedIn, require('./api/followers'));
  app.use('/api/following', isLoggedIn, require('./api/following'));
  app.use('/api/signin', require('./api/signin'));
  app.use('/api/signup', require('./api/signup'));
  //this will catch all requests to bueinesses and attempt to locate them
  //from google places
  app.get('/api/businesses/:businessId', function(req, res) {
    place.index(req, res);
  });
  app.get('/api/place/:businessId', function(req, res) {
    place.index(req, res);
  });

  //this will catch all requests to nearby and attempt to locate places near them
  //from google places
  app.get('/api/nearby/:lat/:lon', function(req, res) {
    nearby.index(req, res);
  });

  app.get('/api/search/:lat/:lon/:searchQuery', function(req, res) {
    search.index(req, res);
  });

    // =====================================
	  //   FACEBOOK ROUTES =====================
	  // =====================================
	  // route for facebook authentication and login
	  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	  // handle the callback after facebook has authenticated the user
	  app.get('/auth/facebook/callback',
		  passport.authenticate('facebook', {
			  successRedirect : '/',
			  failureRedirect : '/'
		  }));

	  // route for logging out
	  app.get('/logout', function(req, res) {
		  req.logout();
		  res.redirect('/');
	  });


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
  });
  
  };
  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

	  // if user is authenticated in the session, carry on
	  if (req.isAuthenticated())
		  return next();

	  // if they aren't redirect them to the home page
	  res.redirect('/');
  }

