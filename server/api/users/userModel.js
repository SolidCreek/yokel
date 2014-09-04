//queries related to creating, updating and querying user data
// var neo4j = require('neo4j');
var Promise = require('bluebird');

var neo4j= require('neo4j');

var neo4jUrl = 'http://neo4jake.cloudapp.net' || 'http://localhost:7474';
var db = new neo4j.GraphDatabase(neo4jUrl);

//instatiate a user object which will inherit prototype functions
var User = function(node){
  this.node = node;
};

//return the current node's id
User.prototype.id = function(){
  return this.node.id;
};

// Set a single property on a user and automatically save
User.prototype.setProperty = function(property, value) {
  this.node.data[property] = value;
  return this.save();
};

// Set a batch of properties on a user and automatically save
User.prototype.setProperties = function(properties) {
  for (var key in properties){
    if (properties.hasOwnProperty(key)){
      this.node.data[key] = properties[key]
    }
  }
  return this.save();
};

// Find a specific property on an instantiated user
User.prototype.getProperty = function(property) {
  return this.node.data[property];
};

//Saves a node to the db: returns a promise with a newly created user user object
User.prototype.save = function (){
  return new Promise(function(resolve, reject){
    this.node.save(function (err, node){
      if(err){ 
        reject(err); 
      } else {
        resolve(new User(node));
      }
    });
  });
};

//Primary function to instantiate new users based on name: returns a promise with a newly created user object
User.createUniqueUser = function (data) {
  return new Promise(function(resolve, reject){
    if (/*!data.facebookID ||*/ !data.name){
      reject('Requires name parameters');
    }

    var query = [
      'MERGE (user:User {facebookID: {facebookID}})',
      'SET user.name = {name}',
      'RETURN user',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err); 
      } else {
        resolve(new User(results[0]['user']));
      }
    });
  });
};

// Find a single user in the database, requires name as input
// If user is not in database, promise will resolve to error 'user does not exist'
User.find = function (data) {
  return new Promise(function(resolve, reject){
    var query = [
      'MATCH (user:User {name: {name}})',
      'RETURN user',
    ].join('\n');

    var params = data;

    db.query(query, params, function (err, results) {
      if(err){ 
        reject(err);
      } else {
        if (results && results[0] && results[0]['user']) {
          resolve(new User(results[0]['user']));
        }
        else {
          reject(new Error('user does not exist'));
        }
      }
    });  
  });
};

//
User.deleteUser = function(data){
  return new Promise(function(resolve, reject){
    if (/*!data.facebookID ||*/ !data.name){
      reject('Requires name parameters');
    }

    var query = [
      'MATCH (user:User {name: {name}})',
      'SET user.name = {name}',
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

module.exports = User;
