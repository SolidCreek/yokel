'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/place', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should respond with JSON object with a name field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.name);
        done();
      });
  });

  it('should respond with JSON object with a placeId field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.placeId);
        done();
      });
  });

  it('should respond with JSON object with a timeOpen field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.timeOpen);
        done();
      });
  });

  it('should respond with JSON object with a timeClose field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.timeClose);
        done();
      });
  });
  
  it('should respond with JSON object with a score field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.score);
        done();
      });
  });

  it('should respond with JSON object with a location field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.location);
        done();
      });
  });

   it('should respond with JSON object with a reviews field', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body.reviews);
        done();
      });
  });

  it('should have an array of reviews', function(done) {
    request(app)
      .get('/api/place')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        res.body.reviews.should.be.instanceof(Array);
        done();
      });
  });
});
