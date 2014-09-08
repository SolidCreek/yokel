'use strict';

var should = require('should');
var User = require('./userModel');
var expect = require('expect');


describe('User nodes', function() {

  it('should not find non-existant nodes', function(){
    User.find({facebookID:"12345"})
    .catch(function(err){
      expect(err.toString()).to.equal("Error: user does not exist");
    });
  });
  it('should add stuff to the db', function(){
    User.createUniqueUser({name:"Stef2", facebookID: "12345"})
    .then(function(resp){
      expect(resp.node._data.data).to.deep.equal({facebookID:"12345", name:"Stef2"});
    });
  });

  it('should find the added node', function(){
    User.find({facebookID: "12345"})
    .then(function(resp){
      expect(resp.node._data.data).to.deep.equal({facebookID:"12345", name:"Stef2"});
    });
  });
  it('should delete nodes', function(){
    User.deleteUser({facebookID:"12345"})
    .then(function(){
      User.find({facebookID:"12345"})
      .catch(function(err){
        expect(err.toString()).to.equal("Error: user does not exist");
      });
    });
  });
});

describe('User relationships', function() {
  //set up 2 users to join
  var user1 = {facebookID: "34567", name: "Stef4"}
  var user2 = {facebookID: "23456", name: "Stef3"}
  it('should create a follows relationship', function(){
    User.createUniqueUser(user1)
    .then(function(resp){
      user1 = resp.node._data.data;
    })
    .then(function(){
      User.createUniqueUser(user2)
      .then(function(resp){
        user2 = resp.node._data.data;
      })
    })
    .then(function(){
      User.addRelationship({facebookID:user1.facebookID}, {facebookID:user2.facebookID}, 'FOLLOWS')
      .then(function(data){
        expect(data.node._data).to.equal(true);
      });
    });
  });
  it('should find related nodes', function(){
    User.findRelated(user1, 'FOLLOWS')
    .then(function(data){
      expect(data.node._data.data).to.equal(true);
    })
  });
  it('should delete an existing follows relationship', function(){
    User.removeRelationship({facebookID:user1.facebookID}, {facebookID:user2.facebookID}, 'FOLLOWS')
    .then(function(data){
      expect(data.node._data).to.equal(true);
    });
  });
  it('should not create a relationship when one thing does not exist', function(){
    User.addRelationship({facebookID: user1.facebookID}, {facebookID: '99999'}, 'FOLLOWS')
    .catch(function(err){
      expect(err.toString).to.equal('at least one side of the relationship does not exist');
    })
  })
});
