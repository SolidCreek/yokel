// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '635436929911242', // your App ID
		'clientSecret' 	: '7846f7ab79357a5bb8dd3ae6e2b978ef', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	}
};
