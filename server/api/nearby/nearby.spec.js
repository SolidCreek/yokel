'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/nearby', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array of objects', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].should.be.instanceof(Object);
        done();
      });
  });

  it('should respond with JSON array of 10 objects', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].should.be.instanceof(Object);
        should.exist(res.body[9]);
        res.body[9].should.be.instanceof(Object);
        should.not.exist(res.body[10]);
        done();
      });
  });

  it('should respond with JSON array of objects with a name field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].name);
        done();
      });
  });

  it('should respond with JSON array of objects with a place_id field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].place_id);
        done();
      });
  });

  it('should respond with JSON array of objects with a timeOpen field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].timeOpen);
        done();
      });
  });

  it('should respond with JSON array of objects with a timeClose field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].timeClose);
        done();
      });
  });
  
  it('should respond with JSON array of objects with a score field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].score);
        done();
      });
  });

  it('should respond with JSON array of objects with a location field', function(done) {
    request(app)
      .get('/api/nearby')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].location);
        done();
      });
  });
});
