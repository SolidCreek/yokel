'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/signin', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/signin')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array that contains an object', function(done) {
    request(app)
      .get('/api/signin')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].should.be.instanceof(Object);
        done();
      });
  });

  it('should respond with JSON array that contains an object that has a token property', function(done) {
    request(app)
      .get('/api/signin')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body[0].token);
        done();
      });
  });
});
