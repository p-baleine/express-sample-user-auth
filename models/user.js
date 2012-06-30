/**
 * User model
 */

var mongoose = require('mongoose')
  , util = require('../util')
  , crypto = require('crypto')
  , Schema = mongoose.Schema;

var algorithm = 'aes256'
  , key = 'nameko';

var User = new Schema({
    name : { type: String, required: true }
  , password : {
      type: String
    , required: true
    // , set: encrypt
    // , get: decrypt
  } // TODO encryption
});

function encrypt(str) {
  var cipher = crypto.createCipher(algorithm, key);
  console.log(cipher.update(str, 'utf8', 'hex') + cipher.final('hex'));
  return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
}

function decrypt(str) {
  var decipher = crypto.createDecipher(algorithm, key);
  return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
}

User.statics.authenticate = function(name, password, fn) {
  this.findOne({ name : name }, function(err, doc) {
    console.log(doc);
    if (doc && doc.password === password) return fn(null, doc);
    fn(new Error('invalid user'));
  });
};

exports.model = util.singleton(function() {
  return mongoose.model('User', User);
});
