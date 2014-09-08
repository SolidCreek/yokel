
var Place = require('../place/placeModel.js');
var Review = require('../reviews/reviewModel.js');
var config = require('../../config/environment/production');
var Promise = require('bluebird');
var request = require('request');

//fetch business data 

//fetch detailed place info from google

//fetch score and reviews from DB
var addDatabase = function(place){
  //look up place: create if non-existent
  place.score = Place.findScore(place);
  place.reviews = Place.findRelated(place);
  return Promise.props(place);
};

//google places api call here!!
var apiRequest = function(req, res){
  request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + req.param("businessId") + '&key='+ config.googleAPIKey, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var place = JSON.parse(body).result;
      addDatabase(place)
      .then(function(placeInfo){
        res.json([
          {
            name: placeInfo.name,
            score: placeInfo.score,
            reviews: placeInfo.reviews,
            address: placeInfo.formatted_address,
            lattitude: placeInfo.geometry.location.lat,
            longitude: placeInfo.geometry.location.lng,
            bulkData: placeInfo
          }
        ]);
      })
      .catch(function(error){
        res.send(500);
        throw("There was and error with an API request: " + error);
      });
    } else {
      console.log("There was an error with the request: " + error + "\nCode: " + response.statusCode);
      res.send(500);
    }
  });
};
//sends a single business along with score and reviews
exports.index = function(req, res){
  if(config.googleAPIKey){
    //we expect in a google places_id in req data
    if(req.param("businessId")){
      apiRequest(req, res);
    } else {
      res.send(400);
    }
  } else {
    res.send(500);
    throw("No googleAPIKey found on your system, "+
          "please set an enviroment variable using, "+
          "export GOOGLE_API_KEY=yourAPIKeyHere "+
          "in the terminal that you are running the server in "+
          "or set in in your bash_profial for persistance." +
          "Your Key was: " + config.googleAPIKey);
  }
};