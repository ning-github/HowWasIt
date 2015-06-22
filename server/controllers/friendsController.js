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
      console.log('GETFRIENDLIST FUNCTION HAPPENED, url requested: ', req.url);

      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123
      
      User.forge().where({id: userId}).fetch({
        withRelated: ['friends']
      }).then(function(model) {
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
      console.log('SEARCHMEMBERS FUNCTION HAPPENED, url requested: ', req.url);
      // db.Message.findAll({include: [db.User]})
      //   .complete(function(err, results){
      //     // optional mapping step
      //     res.json(results);
      //   });
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
      console.log('REMOVEFRIEND FUNCTION HAPPENED, url requested: ', req.url);

      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123
      var friendId = req.body.id;

      var newConnection = new UserConnection({user_id: userId, friend_user_id: friendId});
      newConnection.fetch().then(function(found) {
        if (!found) {
          res.status(200).send('User is not your friend!');
        } else {
          found.where({user_id: userId, friend_user_id: friendId}).destroy().then(function(connection) {
            console.log(connection);
            UserConnections.remove(connection);
            // Send back friend ID so that client can remove friend from friendList
            res.status(200).send({friendId: friendId});
          });
        }
      });
    }
  }

};

