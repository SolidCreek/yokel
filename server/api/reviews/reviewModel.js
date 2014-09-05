// queries related to creating, updating, and reading review data// queries related to querying, and updating review data//queries related to creating, updating and querying review data
// var neo4j = require('neo4j');
var Promise = require('bluebird');

var neo4j= require('neo4j');
/*remember to switch to production once we are sure everything works!*/
var neo4jUrl = 'http://neo4yokel.cloudapp.net';
/********************************************************************/
var db = new neo4j.GraphDatabase(neo4jUrl);
var _ = require('lodash');

//instatiate a review object which will inherit prototype functions
var Review = function(node){
  this.node = node;
};



//Functions to add/find/remove reviews
//Primary function to instantiate new reviews based on review id: 
//requires an object parameter that includes {reviewID: value, text: "This is the review text", score: 27} 
//returns a promise with a newly created review object
Review.createUniqueReview = function (data) {
  return new Promise(function(resolve, reject){
    if (!data.reviewID){
      reject('Requires review ID parameter');
    }

    var query = [
      'MERGE (review:Review {reviewID: {reviewID}})',
      'SET review.text = {text}, review.score={score}',
      'RETURN review',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve(new Review(results[0].review));
      }
    });
  });
};

// Find a single review in the database, requires reviewID as input
// If review is not in database, promise will resolve to error 'review does not exist'
Review.find = function (data) {
  return new Promise(function(resolve, reject){
    var query = [
      'MATCH (review:Review {reviewID: {reviewID}})',
      'RETURN review',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err);
      } else {
        if (results && results[0] && results[0].review) {
          resolve(new Review(results[0].review));
        } else {
          reject(new Error('review does not exist'));
        }
      }
    });  
  });
};

//Deletes review, requires reviewID as input.
Review.deletereview = function(data){
  return new Promise(function(resolve, reject){
    if (!data.reviewID){
      reject('Requires review ID parameter');
    }

    var query = [
      'MATCH (review:Review {reviewID: {reviewID}})',
      'DELETE review',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve("review deleted!");
      }
    });
  });
};

//functions to add/find/delete relationships
//reviews don't have any outbound relationships.


module.exports = Review;
