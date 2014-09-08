/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');
var Place = require('../places/placeModel.js');
var Promise = require('bluebird');
var http = require('http');
var config = require('../../config/environment/production');
var Place = require('../place/placeModel.js');
var Promise = require('bluebird');

// Get list of locations that are top ranked in the radius
//there will be a google api call here to get all of the restraunts in the 
//given area. 

//api call gets a list of places : currently faked
//these will come in without scores

//helper function to look up place and insert score
var addDatabase = function(place){
  //look up place: create if non-existent
  place.score = Place.findScore({place_id: place.place_id});
  return Promise.props(place);
};
//adds all scores for the list of places
var addScores = function(places){
  var placesWithReviews = [];
  for(var i = 0; i < places.length; i++){
    placesWithReviews.push(addDatabase(places[i]));
  }
  return Promise.all(placesWithReviews);
}
//find the 10 best places by score
var findBest = function(placesWithScores){
  //sort array in descending order by score
  placesWithScores.sort(function(a, b){
    if(a.score < b.score){
      return 1;
    } else if (a.score > b.score){
      return -1;
    }
    return 0;
  })
  //return the first 10 items
  return placesWithScores.splice(0, 10);
}
var apiRequest = function(req, res){
  request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ req.param("lat") + ',' + req.param("lon") +'&keyword=' + req.param("searchQuery") + '&radius=40400&types=food&key=' + config.googleAPIKey, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var places = JSON.parse(body).results
      addScores(places)
       .then(function(data){
         res.json(findBest(data));
       });
    }
  })
};
//and finaly serve that information, so so should only be storing the "local rating" and reviews
//of the location and grabbing all of the other info from google places!
//also we might want to concider grabbing our reviews now so they are ready
//when the location is selected later
exports.index = function(req, res) {
  if(config.googleAPIKey){
    //we expect in a google places_id in req data
    if(req.param("lat") && req.param("lat") && req.param("searchQuery")){
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
          "or set in in your bash_profial for persistance."+
          "Your Key was: " + config.googleAPIKey);
  }
};