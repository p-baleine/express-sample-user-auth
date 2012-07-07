/**
 * DB
 */

var mongoose = require('mongoose')
  , myutil = require('./myutil');

module.exports = function(connstr) {
  return {
    init : myutil.singleton(function(fn) {
      console.log('connecting to mongo via ' + connstr);
      mongoose.connect(connstr);
      return !fn || fn(mongoose.connection);
    })
  };
};