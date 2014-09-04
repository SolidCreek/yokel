//queries related to creating, updating and querying user data
// var neo4j = require('neo4j');
var Promise = require('bluebird');

var neo4j= require('neo4j');
/*remember to switch to production once we are sure everything works!*/
var neo4jUrl = 'http://neo4yokel.cloudapp.net';
/********************************************************************/
var db = new neo4j.GraphDatabase(neo4jUrl);
var _ = require('lodash');

//instatiate a user object which will inherit prototype functions
var User = function(node){
  this.node = node;
};



//Functions to add/find/remove users
//Primary function to instantiate new users : returns a promise with a newly created user object
//data must include facebookID, facebookToken, name, and email.
User.createUniqueUser = function (data) {
  return new Promise(function(resolve, reject){
    if (!data.facebookID || !data.name){
      reject('Requires facebook ID and name parameters');
    }

    var query = [
      'MERGE (user:User {facebookID: {facebookID}})',
      'SET user.name = {name}, user.email={email}, user.facebookToken={facebookToken}',
      'RETURN user',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve(new User(results[0].user));
      }
    });
  });
};

// Find a single user in the database, requires facebookID as input
// If user is not in database, promise will resolve to error 'user does not exist'
User.find = function (data) {
  return new Promise(function(resolve, reject){
    var query = [
      'MATCH (user:User {facebookID: {facebookID}})',
      'RETURN user',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err);
      } else {
        if (results && results[0] && results[0].user) {
          resolve(new User(results[0].user));
        } else {
          reject(new Error('user does not exist'));
        }
      }
    });  
  });
};

//Deletes user, requires facebookID as input.
User.deleteUser = function(data){
  return new Promise(function(resolve, reject){
    if (!data.facebookID){
      reject('Requires facebook ID parameter');
    }

    var query = [
      'MATCH (user:User {facebookID: {facebookID}})',
      'DELETE user',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve("User deleted!");
      }
    });
  });
};

//functions to add/find/delete relationships

//helper function to set query parameters, returns array of types needed to make relationship
var chooseTypes = function(relationshipType){
  var thingType;
  var idType;
  if(relationshipType === 'FOLLOWS'){
    idType = 'facebookID';
    thingType = 'User';
  } else if (relationshipType === 'HAS'){
    idType = 'reviewID';
    thingType = 'Review';
  } else if (relationshipType === 'ISLOCAL'){
    idType = 'placeID';
    thingType= 'Place';
  }
  return [thingType, idType];
};

//add relationship: requires a user, and a thing that user related to, and a relationship type
User.addRelationship = function(user, thing, relationshipType){
  var types = chooseTypes(relationshipType);
  var idType = types[1];
  var thingType = types[0];

  return new Promise(function(resolve, reject){

    if (!user.facebookID || !thing[idType]){
      reject('Requires facebook ID parameter and ' + idType + ' parameter');
    }

    var query = [
      'MATCH (user:User {facebookID: {user.facebookID}})',
      'MATCH (thing:' + thingType + ' {' + idType +': thing.' + idType + '})',
      'MERGE (user)-[r:' + relationshipType + ']->(thing)',
      'RETURN user'
    ].join('\n');

    var params = {user:user,  thing:thing};

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err);
      } else {
        if (results && results[0] && results[0].user) {
          resolve(new User(results[0].user));
        } else {
          reject(new Error('at least one side of the relationship does not exist'));
        }
      }
    });
  });
};



//delete relationship:  requires a user, and a thing that user related to, and a relationship type
User.removeRelationship = function(user, thing, relationshipType){
  var types = chooseTypes(relationshipType);
  var idType = types[1];
  var thingType = types[0];

  return new Promise(function(resolve, reject){

    if (!user.facebookID || !thing[idType]){
      reject('Requires facebook ID parameter and ' + idType + ' parameter');
    }

    var query = [
      'MATCH (user:User {facebookID: {user.facebookID}})',
      'MATCH (thing:{thingType}  {' + idType +': thing.' + idType + '})',
      'MATCH (user)-[r:' + relationshipType + ']->(thing)',
      'DELETE r',
      'RETURN user'
    ].join('\n');

    var params = {user:user,  thing:thing, thingType:thingType};

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err);
      } else {
        if (results && results[0] && results[0].user) {
          resolve(new User(results[0].user));
        } else {
          reject(new Error('at least one side of the relationship does not exist'));
        }
      }
    });
  });
};
//finds related nodes by relationship type
User.findRelated = function(facebookID, relationshipType){
  return new Promise(function(resolve, reject){

    var query = [
      'MATCH (user:User {facebookID: {facebookID}})-[:{relationshipType}]->(node)',
      'RETURN node,'
    ].join('\n');

    var params = {
      'facebookID': facebookID,
      'relationshipType': relationshipType
    };
    
    db.query(query, params, function (err, results) {
      if (err){
       reject(err); 
      } else {
        var parsedResults = _.map(results, function (item) {
          return item;
        });
        resolve(parsedResults);
      }
    });
  });
};


module.exports = User;
