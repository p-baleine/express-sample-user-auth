
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , SessionMongoose = require('session-mongoose')
  , Resource = require('express-resource')
  , db = require('./db');

var app = module.exports = express.createServer()
  , User = require('./models/user').model();

// Configuration

app.configure('development', function(){
  app.set('mongoconn', 'mongodb://localhost/nameko-blog');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.set('mongoconn', 'mongodb://localhost/nameko-blog');
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    store: new SessionMongoose({ url: app.set('mongoconn') })
  , secret : 'nameko'
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.dynamicHelpers({ messages: require('express-messages') });
  db(app.set('mongoconn')).init();
});

function requireLogin(req, res, next) {
  if (!req.url.match(/login/) && !req.user) {
    req.flash("info", "please login");
    res.redirect('/login');
    return;
  }
  else {
    next();
  }
}

function loadUser(req, res, next) {
  if (req.session.user) {
    User.findOne({ id : req.session.user.id }, function(err, doc) {
      req.user = doc;
      next();
    });
  } else {
    next();
  }
}

app.all('/*', loadUser, requireLogin);

// Resource
app.resource('login', require('./routes/login'));

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
