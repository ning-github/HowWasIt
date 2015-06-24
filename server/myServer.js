var express = require("express");
var morgan = require("morgan");
var parser = require("body-parser");
var router = require("./routes.js");
// var passport = require("passport");
var jwt = require('jwt-simple');

// var LocalStrategy = require('passport-local').Strategy;
// var JwtStrategy = require('passport-jwt').Strategy;

var db = require('./db/config');
var User = require ('./db/models/user');

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.forge({username: username}).fetch().then(function(userModel) {
//       if (!userModel){
//         return done(null, false, {message: "User does not exist."});
//       }
      
//       userModel.validPassword(password).then(function(correctPassword) {
//         if (!correctPassword) {
//           return done(null, false, {message: "Invalid password"});
//         }
//         return done(null, userModel);
//       });

//     });
//   }
// ));

// move these into a secret file?
// var opts = {};
// opts.secretOrKey = 'secretString';
// opts.issuer = "accounts.examplesoft.com";
// opts.audience= "yoursite.net";


// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//   console.log('ARE WE GETTING HERE');
//   User.forge({id: jwt_payload.sub}).fetch().then(function(userModel) {
//     if (!userModel) {
//       done(null, false, {message: "User does not exist."});
//     } else {
//       done(null, userModel);
//     }
//   });
// }));

var app = express();
module.exports.app = app;

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(parser.json());

app.set('jwtTokenSecret', 'secretString');
// app.use(passport.initialize());

app.use("/", router);

//TODO: Need to hookup the client here!
app.use(express.static(__dirname + "/../client"));

if (!module.parent) {
	app.listen(app.get("port"));
	console.log("Listening on", app.get("port"));
}