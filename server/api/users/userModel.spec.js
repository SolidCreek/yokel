'use strict';

var should = require('should');
var User = require('./userModel.js');
var expect = require('expect.js');

describe('User Model', function() {

  it('should not find non-existant nodes', function(){
    User.find({name:"Stef2"})
    .catch(function(err){
      expect(err).to.equal(JSON.parse("[Error: user does not exist]"));
    });
  });
  it('should add stuff to the db', function(){
    User.createUniqueUser({name:"Stef2", facebookID: "12345"})
    .then(function(resp){
      expect(resp.node._data.data).to.deep.equal({facebookID:"12345", name:"Stef2"});
    });
  });

  it('should find the added node', function(){
    User.find({name: "Stef2"})
    .then(function(resp){
      expect(resp.node._data.data).to.deep.equal({facebookID:"12345", name:"Stef2"});
    });
  });
  it('should delete nodes', function(){
    User.deleteUser({name:"Stef2"})
    .then(function(){
      User.find({name:"Stef2"})
      .catch(function(err){
        expect(err).to.equal(JSON.parse("[Error: user does not exist]"));
      });
    });
  });
});