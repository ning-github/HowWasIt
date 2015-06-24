var db = require('../db/config');
var bluebird = require('bluebird');
var url = require('url');

var User = require('../db/models/user');
var Users = require('../db/collections/users');
var Review = require('../db/models/review');
var Reviews = require('../db/collections/reviews');
var UserConnection = require('../db/models/userConnection');
var UserConnections = require('../db/collections/userConnections');

module.exports = {

  getFriendList: {
    get: function (req, res) {
      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123
      
      User.forge().where({id: userId}).fetch({
        withRelated: ['friends']
      }).then(function(model) {
        // see user database model 
        res.status(200).send(model.related('friends').models);
      });

    },
    post: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    }
  },

  searchMembers: {
    get: function (req, res) {
      console.log("REQUEST HEADERS: ", req.headers);
      var query = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?query=123

      // Search all substrings of username, first_name, last_name, and email fields
      User.forge().query(function(qb) {
        qb.where('username', 'LIKE', '%' + query + '%')
        .orWhere('first_name', 'LIKE', '%' + query + '%')
        .orWhere('last_name', 'LIKE', '%' + query + '%')
        .orWhere('email', 'LIKE', '%' + query + '%');
      })
      .fetchAll().then(function(models) {
        res.status(200).send(models.models);
      });
      
    },
    post: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    }
  },

  addFriend: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    },
    post: function (req, res) {
      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123
      var friendId = req.body.id;

      var newConnection = new UserConnection({user_id: userId, friend_user_id: friendId});
      newConnection.fetch().then(function(found) {
        if (found) {
          res.status(200).send('User already is your friend!');
        } else {
          newConnection.save().then(function(connection) {
            UserConnections.add(connection);
            // Send back friend so that client can add to friendList?
            res.status(200).send(connection);
          });
        }
      });

    }
  },

  removeFriend: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
      res.status(400).send('Bad Request');
    },
    post: function (req, res) {
      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123
      var friendId = req.body.id;

      var newConnection = new UserConnection({user_id: userId, friend_user_id: friendId});
      newConnection.fetch().then(function(found) {
        if (!found) {
          res.status(200).send('User is not your friend!');
        } else {
          found.where({user_id: userId, friend_user_id: friendId}).destroy().then(function(connection) {
            UserConnections.remove(connection);
            // Send back friend ID so that client can remove friend from friendList
            res.status(200).send({friendId: friendId});
          });
        }
      });
    }
  }

};

