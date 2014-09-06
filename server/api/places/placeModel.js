// queries related to querying, and updating place data//queries related to creating, updating and querying Place data
// var neo4j = require('neo4j');
var Promise = require('bluebird');

var neo4j= require('neo4j');
/*remember to switch to production once we are sure everything works!*/
var neo4jUrl = 'http://neo4yokel.cloudapp.net';
/********************************************************************/
var db = new neo4j.GraphDatabase(neo4jUrl);
var _ = require('lodash');

//instatiate a Place object which will inherit prototype functions
var Place = function(node){
  this.node = node;
};



//Functions to add/find/remove Places
//Primary function to instantiate new Places based on place id: 
//requires an object parameter that includes {placeID: value} 
//returns a promise with a newly created Place object
Place.createUniquePlace = function(data){
  return new Promise(function(resolve, reject){
    if(!data.placeID){
      reject('Requires place ID parameter');
    }

    var query = [
      'MERGE (place:Place {placeID: {placeID}})',
      'ON CREATE SET place.score = 50',
      'RETURN place',
    ].join('\n');

    var params = data;

    db.query(query, params, function(err, results){
      if(err){ 
        reject(err); 
      } else {
        resolve(new Place(results[0].place));
      }
    });
  });
};

// Find a single Place in the database, requires placeID as input
// If Place is not in database, promise will resolve to error 'Place does not exist'
Place.find = function(data){
  return new Promise(function(resolve, reject){
    var query = [
      'MATCH (place:Place {placeID: {placeID}})',
      'RETURN place',
    ].join('\n');

    var params = data;

    db.query(query, params, function(err, results){
      if(err){ 
        reject(err);
      } else {
        if(results && results[0] && results[0].place){
          resolve(new Place(results[0].place));
        } else {
          reject(new Error('Place does not exist'));
        }
      }
    });  
  });
};

Place.findScore = function(data){
  return new Promise(function(resolve, reject){
    Place.createUniquePlace(data)
    .then(function(data){
      resolve(data.node._data.data.score);
    })
    .catch(function(err){
      resolve(new Error('Score could not be found'));
    });
  });
}

//Deletes Place, requires placeID as input.
Place.deletePlace = function(data){
  return new Promise(function(resolve, reject){
    if(!data.placeID){
      reject('Requires place ID parameter');
    }

    var query = [
      'MATCH (place:Place {placeID: {placeID}})',
      'DELETE place'
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve("Place deleted!");
      }
    });
  });
};

//functions to add/find/delete relationships


//add relationship: requires a Place, and a review,
Place.addRelationship = function(place, review){
  return new Promise(function(resolve, reject){

    if(!place.placeID || !review.reviewID){
      reject('Requires place ID parameter and review ID parameter');
    }

    var query = [
      'MATCH (place:Place {placeID: {place.placeID}})',
      'MATCH (review:Review {reviewID: reviewID})',
      'MERGE (place)-[r:HAS]->(review)',
      'RETURN place'
    ].join('\n');

    var params = {place:place,  review:review};

    db.query(query, params, function(err, results){
      if(err){ 
        reject(err);
      } else {
        if(results && results[0] && results[0].place){
          resolve(new Place(results[0].place));
        } else {
          reject(new Error('at least one side of the relationship does not exist'));
        }
      }
    });
  });
};



//delete relationship:  requires a Place, and a review
Place.removeRelationship = function(place, review){

  return new Promise(function(resolve, reject){

    if (!place.placeID || !review.reviewID){
      reject('Requires place ID parameter and review ID parameter');
    }

    var query = [
      'MATCH (place:Place {placeID: {place.placeID}})',
      'MATCH (review:Review {reviewID: reviewID})',
      'MERGE (place)-[r:HAS]->(review)',
      'DELETE r',
      'RETURN place'
    ].join('\n');

    var params = {place:place,  review:review};

    db.query(query, params, function(err, results){
      if(err){ 
        reject(err);
      } else {
        if(results && results[0] && results[0].place){
          resolve(new Place(results[0].place));
        } else {
          reject(new Error('at least one side of the relationship does not exist'));
        }
      }
    });
  });
};
//finds reviews
Place.findRelated = function(placeID){
  return new Promise(function(resolve, reject){

    var query = [
      'MATCH (place:Place {placeID: {placeID}})-[:HAS]->(review)',
      'RETURN review'
    ].join('\n');

    var params = {
      'placeID': placeID
    };
    
    db.query(query, params, function(err, results){
      if(err){
       reject(err); 
      } else {
        var parsedResults = _.map(results, function(item){
          return item;
        });
        resolve(parsedResults);
      }
    });
  });
};


module.exports = Place;
