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
var Place = require('../places/placeModel.js');
var Promise = require('bluebird');

// Get list of locations that are top ranked in the radius
//there will be a google api call here to get all of the restraunts in the 
//given area. 

//api call gets a list of places : currently faked
//these will come in without scores
var places = [
    {
      name : 'SuperDuper',
      placeId: '87o3giyrlb3o7',
      timeOpen: '0900',
      timeClose: '2230',
      location: ''
    },
    {
      name : 'Blue Bottle',
      placeId: 'gsldufgyow75w',
      timeOpen: '0600',
      timeClose: '1900',
      location: ''
    },
    {
      name : 'Panda Express',
      placeId: '872613irghkyj',
      timeOpen: '1000',
      timeClose: '2200',
      location: ''
    },
    {
      name : 'Philz',
      placeId: '923764grfyunf',
      timeOpen: '0500',
      timeClose: '2000',
      location: ''
    },
    {
      name : 'Fish Place',
      placeId: 'gjkds7o8yihlu4',
      timeOpen: '1400',
      timeClose: '2330',
      location: ''
    },
    {
      name : 'ZPizza',
      placeId: '9s8oduiyhbvbcds',
      timeOpen: '1000',
      timeClose: '0100',
      location: ''
    },
    {
      name : 'Beer-n-Stuff',
      placeId: '76gdfbakj3ybbf',
      timeOpen: '1700',
      timeClose: '0415',
      location: ''
    },
    {
      name : 'Red Rose',
      placeId: '87aiygkjrfb43d',
      timeOpen: '0900',
      timeClose: '2200',
      location: ''
    },
    {
      name : '24 Hour Good Eats',
      placeId: 'iauw6ygfaikuwy',
      timeOpen: '0000',
      timeClose: '2359',
      location: ''
    },
    {
      name : 'Little Peats Big Grill',
      placeId: '98q7w6tefgyubbf',
      timeOpen: '1400',
      timeClose: '2345',
      location: ''
    }
  ];

//helper function to look up place and insert score
var addDatabase = function(place){
  //look up place: create if non-existent
  place.score = Place.findScore({placeID: place.placeId});
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
  places.sort(function(a, b){
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


//and finaly serve that information, so so should only be storing the "local rating" and reviews
//of the location and grabbing all of the other info from google places!
//also we might want to concider grabbing our reviews now so they are ready
//when the location is selected later
exports.index = function(req, res) {
  addScores(places)
  .then(function(data){
    res.json(findBest(data));
  });
};