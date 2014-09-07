// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
//Needs to change
var User       = require('../../api/users/userModel');

// load the auth variables
var configAuth = require('../../config/auth');

module.exports = function(passport) {

	// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.facebookID);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.find({facebookID:id})
      .then(function(user) {
          done(user);
      })
      .catch(function(err){
        done(err)
      });
  });
    
	// code for login (use('local-login', new LocalStategy))
	// code for signup (use('local-signup', new LocalStategy))

	// =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

		// pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
          
                //this section need to change as it deals with the database
          // find the user in the database based on their facebook id
                profile = profile._json;
              User.createUniqueUser({facebookID:profile.id, 
                           facebookToken:token, 
                           name: profile.name,
                           email:profile.email})
              .then(function(data){
                return done(null, data.node._data.data);
              })
              .catch(function(err){
                return done(err);
              });
            });

        }));

    };