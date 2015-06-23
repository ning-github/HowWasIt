var express = require("express");
var morgan = require("morgan");
var parser = require("body-parser");
var router = require("./routes.js");
var passport = require("passport");
var session = require('express-session');

var db = require('./db/config');


var app = express();
module.exports.app = app;

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(parser.json());

app.use(session({
  secret: 'SecretCookie',
  resave: true,
  saveUninitialized: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", router);

// passport.use(new LocalStrategy(
//   function(username,password,done){
//     User.forge().where({username: username})
//     .fetch().then(function(userModel){
//       if (!userModel){
//         return done(null, false, {message: "User does not exist."});
//       }
//       if (!userModel.validPassword(password)){
//         return done(null, false, {message: "Invalid password"});
//       }
//       return done(null, userModel);
//     });
//   }
// ));

//TODO: Need to hookup the client here!
app.use(express.static(__dirname + "/../client"));

if (!module.parent) {
	app.listen(app.get("port"));
	console.log("Listening on", app.get("port"));
}