'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/activity', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/activity')
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
      .get('/api/activity')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].should.be.instanceof(Object);
        done();
      });
  });
  it('should respond with JSON array of objects with a timeOfEvent field', function(done) {
    request(app)
      .get('/api/activity')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].timeOfEvent);
        done();
      });
  });
  it('should respond with JSON array of objects with a event field', function(done) {
    request(app)
      .get('/api/activity')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].event);
        done();
      });
  });
  it('should respond with JSON array of objects with a value field', function(done) {
    request(app)
      .get('/api/activity')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].value);
        done();
      });
  });
  it('should respond with JSON array of objects with a value field that is an object', function(done) {
    request(app)
      .get('/api/activity')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].value.should.be.instanceof(Object);
        done();
      });
  });
});
