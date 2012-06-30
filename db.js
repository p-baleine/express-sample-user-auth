/**
 * DB
 */

var mongoose = require('mongoose')
  , util = require('./util');

module.exports = function(connstr) {
  return {
    init : util.singleton(function(fn) {
      console.log('connecting to mongo via ' + connstr);
      mongoose.connect(connstr);
      return !fn || fn(mongoose.connection);
    })
  };
};