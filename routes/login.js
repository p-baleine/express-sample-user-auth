/**
 * login
 */

var User = require('../models/user').model();

/**
 * GET /login
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/**
 *  POST /login
 */
exports.create = function(req, res) {
  User.authenticate(req.body.name, req.body.password, function(err, user) {
    if (err) {
      req.flash("notice", "invalid name or password");
      res.redirect('/login');
    } else {
      req.session.user = user;
      req.flash("info", "welcome");
      res.redirect('/login'); // index
    }
  });
};

// DELETE  /forums/:forum       ->  destroy