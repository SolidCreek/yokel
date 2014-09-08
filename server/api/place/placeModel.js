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

// Example data object: 
// {
//   place_id: 453ade3211ff2 
//   name: "Bob's Burgers"
//   score: 47
// }

//Functions to add/find/remove Places
//Primary function to instantiate new Places based on place id: 
//requires an object parameter that includes {place_id: value} 
//returns a promise with a newly created Place object
Place.createUniquePlace = function(data){
  return new Promise(function(resolve, reject){
    if(!data.place_id && !data.name){
      reject('Requires place ID && name parameter');
    }

    var query = [
      'MERGE (place:Place {place_id: {place_id}})',
      'ON CREATE SET place.score = 50, place.name = {name}',
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

// Find a single Place in the database, requires place_id as input
// If Place is not in database, promise will resolve to error 'Place does not exist'
Place.find = function(data){
  return new Promise(function(resolve, reject){
    var query = [
      'MATCH (place:Place {place_id: {place_id}})',
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

//gets the place score.  requires place_id as input
Place.findScore = function(data){
  return new Promise(function(resolve, reject){
    Place.createUniquePlace(data)
    .then(function(data){
      resolve(data.node._data.data.score);
    })
    .catch(function(err){
      console.log("There was an error finding the score: " + err);
      resolve(new Error('Score could not be found'));
    });
  });
};


//Deletes Place, requires place_id as input.
Place.deletePlace = function(data){
  return new Promise(function(resolve, reject){
    if(!data.place_id){
      reject('Requires place ID parameter');
    }

    var query = [
      'MATCH (place:Place {place_id: {place_id}})',
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

    if(!place.place_id || !review.reviewID){
      reject('Requires place ID parameter and review ID parameter');
    }

    var query = [
      'MATCH (place:Place {place_id: {place.place_id}})',
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

    if (!place.place_id || !review.reviewID){
      reject('Requires place ID parameter and review ID parameter');
    }

    var query = [
      'MATCH (place:Place {place_id: {place.place_id}})',
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
Place.findRelated = function(place_id){
  return new Promise(function(resolve, reject){

    var query = [
      'MATCH (place:Place {place_id: {place_id}})-[:HAS]->(review)',
      'RETURN review'
    ].join('\n');

    var params = {
      'place_id': place_id
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

//updates the local score based on the reviews a place has
//requires an object with a place id
Place.updateScore = function(data){
  
};


module.exports = Place;
