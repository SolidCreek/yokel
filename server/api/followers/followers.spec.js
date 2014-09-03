'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/followers', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/followers')
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
      .get('/api/followers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body[0].should.be.instanceof(Object);
        done();
      });
  });

  it('should respond with JSON array of objects with a name field', function(done) {
    request(app)
      .get('/api/followers')
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

  it('should respond with JSON array of objects with a userId field', function(done) {
    request(app)
      .get('/api/followers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].userId);
        done();
      });
  });

  it('should respond with JSON array of objects with a dateFollowed field', function(done) {
    request(app)
      .get('/api/followers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].dateFollowed);
        done();
      });
  });

  it('should respond with JSON array of objects with a score field', function(done) {
    request(app)
      .get('/api/following')
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
  
  it('should respond with JSON array of objects with a lastSeen field', function(done) {
    request(app)
      .get('/api/followers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          return done(err);
        }
        should.exist(res.body[0].lastSeen);
        done();
      });
  });
});
