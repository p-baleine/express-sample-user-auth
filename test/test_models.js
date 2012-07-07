var should = require('should')
  , db = require('../db')
  , User = require('../models/user').model();

describe('User', function() {
  before(function(done) {
    db('mongodb://localhost/nameko-blog-test').init(function() {
      User.collection.drop(function() {
        done();
      });
    });
  });

  describe('instantiation', function(){
    describe('#save() with name and password', function() {
      var subject;

      beforeEach(function(done) {
        subject = new User({ name: 'Cocteau', password: '390' });
        done();
      });
      it('should be saved without error', function(done) {
        subject.save(function(err) {
          if (err) done(err);
          done();
        });
      });
      it('should be saved with name', function() {
        subject.save(function() {
          subject.name.should.be.equal('Cocteau');
        });
      });
      it('should be saved with password', function() {
        subject.save(function() {
          subject.password.should.be.equal('390');
        });
      });
    });

    describe('#save() without name', function() {
      var subject;

      before(function(done) {
        subject = new User({ password: '390' });
        done();
      });
      it('should not be saved', function(done) {
        subject.save(function(err) {
          err.name.should.equal('ValidationError');
          done();
        });
      });
    });

    describe('#save() without password', function() {
      var subject;

      before(function(done) {
        subject = new User({ name : 'Cocteau' });
        done();
      });
      it('should not be saved', function(done) {
        subject.save(function(err) {
          err.name.should.equal('ValidationError');
          done();
        });
      });
    });
  });

  describe('authentication', function(){
    it('should authenticate corrctly');
  });
});
