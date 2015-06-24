var express = require("express");
var morgan = require("morgan");
var parser = require("body-parser");
var router = require("./routes.js");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db/config');
var User = require ('./db/models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.forge().where({username: username})
    .fetch().then(function(userModel) {
      userModel.validPassword(password, userModel.attributes.password).then(function(correctPassword) {

        if (!userModel){
          return done(null, false, {message: "User does not exist."});
        }
        if (!correctPassword) {
          return done(null, false, {message: "Invalid password"});
        }
        return done(null, userModel);
      });
    });
  }
));

var app = express();
module.exports.app = app;

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(parser.json());


app.use(passport.initialize());

app.use("/", router);

//TODO: Need to hookup the client here!
app.use(express.static(__dirname + "/../client"));

if (!module.parent) {
	app.listen(app.get("port"));
	console.log("Listening on", app.get("port"));
}