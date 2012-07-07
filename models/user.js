/**
 * User model
 */

var mongoose = require('mongoose')
  , myutil = require('../myutil')
  , crypto = require('crypto')
  , Schema = mongoose.Schema;

var algorithm = 'aes-256-cbc'
  , key = 'InmbuvP6Z8';

var User = new Schema({
    name : { type: String, required: true }
  , password : {
      type: String
    , required: true
    , set: encrypt
    , get: decrypt
  }
});

function encrypt(str) {
  var cipher = crypto.createCipher(algorithm, key);
  cipher.update(str, 'utf8', 'hex');
  return cipher.final('hex');
}

function decrypt(str) {
  var decipher = crypto.createDecipher(algorithm, key);
  decipher.update(str, 'hex', 'utf8');
  return decipher.final('utf8');
}

User.statics.authenticate = function(name, password, fn) {
  this.findOne({ name : name }, function(err, doc) {
    console.log(doc);
    if (doc && doc.password === password) return fn(null, doc);
    fn(new Error('invalid user'));
  });
};

exports.model = myutil.singleton(function() {
  return mongoose.model('User', User);
});
