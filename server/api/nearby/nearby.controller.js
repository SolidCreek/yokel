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

// Get list of locations that are top ranked in the radius
//there will be a google api call here to get all of the restraunts in the 
//given area. 

//then we will comapire the list to our database to find the best ones
//and finaly serve that information, so so should only be storing the "local rating" and reviews
//of the location and grabbing all of the other info from google places!
//also we might want to concider grabbing our reviews now so they are ready
//when the location is selected later
exports.index = function(req, res) {
  res.json([
    {
      name : 'SuperDuper',
      placeId: '87o3giyrlb3o7',
      timeOpen: '0900',
      timeClose: '2230',
      score: '54',
      location: ''
    },
    {
      name : 'Blue Bottle',
      placeId: 'gsldufgyow75w',
      timeOpen: '0600',
      timeClose: '1900',
      score: '77',
      location: ''
    },
    {
      name : 'Panda Express',
      placeId: '872613irghkyj',
      timeOpen: '1000',
      timeClose: '2200',
      score: '81',
      location: ''
    },
    {
      name : 'Philz',
      placeId: '923764grfyunf',
      timeOpen: '0500',
      timeClose: '2000',
      score: '88',
      location: ''
    },
    {
      name : 'Fish Place',
      placeId: 'gjkds7o8yihlu4',
      timeOpen: '1400',
      timeClose: '2330',
      score: '63',
      location: ''
    },
    {
      name : 'ZPizza',
      placeId: '9s8oduiyhbvbcds',
      timeOpen: '1000',
      timeClose: '0100',
      score: '33',
      location: ''
    },
    {
      name : 'Beer-n-Stuff',
      placeId: '76gdfbakj3ybbf',
      timeOpen: '1700',
      timeClose: '0415',
      score: '89',
      location: ''
    },
    {
      name : 'Red Rose',
      placeId: '87aiygkjrfb43d',
      timeOpen: '0900',
      timeClose: '2200',
      score: '90',
      location: ''
    },
    {
      name : '24 Hour Good Eats',
      placeId: 'iauw6ygfaikuwy',
      timeOpen: '0000',
      timeClose: '2359',
      score: '21',
      location: ''
    },
    {
      name : 'Little Peats Big Grill',
      placeId: '98q7w6tefgyubbf',
      timeOpen: '1400',
      timeClose: '2345',
      score: '98',
      location: ''
    }
  ]);
};