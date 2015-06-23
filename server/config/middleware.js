var passport = require('passport');
var LocalStrategy = require('passport-local');

var db = require('./db/config');
var User = require('../db/models/user');
var Users = require('../db/collections/users');

passport.use(new LocalStrategy(
  function(username,password,done){
    User.forge().where({username: username})
    .fetch().then(function(userModel){
      if (!userModel){
        return done(null, false, {message: "User does not exist."});
      }
      if (!userModel.validPassword(password)){
        return done(null, false, {message: "Invalid password"});
      }
      return done(null, userModel);
    });
  }));