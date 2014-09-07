
var Place = require('../place/placeModel.js');
var Review = require('../reviews/reviewModel.js');

var Promise = require('bluebird');


//fetch business data 

//fetch detailed place info from google
var place = {
      name : 'SuperDuper',
      placeId: '87o3giyrlb3o7',
      timeOpen: '0900',
      timeClose: '2230',
      location: ''
    };

//fetch score and reviews from DB
var addDatabase = function(place){
  //look up place: create if non-existent
  place.score = Place.findScore({placeID: place.placeId});
  place.reviews = Place.findRelated({placeID: place.placeId});
  return Promise.props(place);
};

//sends a single business along with score and reviews
exports.index = function(req, res){
    //return object with score and reviews and google data
  addDatabase(place)
  .then(function(data){
    res.json(data);
  });
};