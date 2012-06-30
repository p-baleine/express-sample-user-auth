/**
 * util
 */

module.exports = {

  /**
   * return a function which holds singleton instance.
   * @param {Function} init function which initialized instance
   * @return {Function} function which holds singleton instance
   */
  singleton : function(init, ctxt) {
    var instance = null;

    return function() {
      if (!instance) instance = init.apply(ctxt, arguments);
      return instance;
    };
  }

};