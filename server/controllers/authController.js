var passport = require('passport');
var bcrypt = require('bcrypt-node');
var db = require('../db/config');
var User = require('../db/models/user');
var Users = require('../db/collections/users');

module.exports = {

  login: {
    post: function (req, res) {
      
    }
  },

  signup: {
    post: function (req, res) {
      var username = req.body.username;
      var password = req.body.password;
      bcrypt.hash(password, null, null, function(err, hash){
        console.log(hash);
        User.forge({username: username, password: hash}).save()
        .then(function(model){
          res.status(200).send(model);
        })
      })
    }
  },

  logout: {
    post: function (req, res) {

    }
  }

}

