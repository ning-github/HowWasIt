var db = require('../db/config');
var bluebird = require('bluebird');


module.exports = {

  getFriendList: {
    get: function (req, res) {
      // db.Message.findAll({include: [db.User]})
      //   .complete(function(err, results){
      //     // optional mapping step
      //     res.json(results);
      //   });
    },
    post: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
    }
  },

  searchMembers: {
    get: function (req, res) {
      // db.Message.findAll({include: [db.User]})
      //   .complete(function(err, results){
      //     // optional mapping step
      //     res.json(results);
      //   });
    },
    post: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
    }
  },

  addFriend: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
    },
    post: function (req, res) {
      // db.User.findOrCreate({where: {username: req.body.username}})
      //   .complete(function(err, results){
      //     db.Message.create({
      //       userid: results[0].dataValues.id,
      //       text: req.body.message,
      //       roomname: req.body.roomname
      //     }).complete(function(err, results){
      //       res.sendStatus(201);
      //     });
      //   });
    }
  },

  removeFriend: {
    get: function (req, res) {
      // TODO: Fix, for some reason routes.js needs this here.
    },
    post: function (req, res) {
      // db.User.findOrCreate({where: {username: req.body.username}})
      //   .complete(function(err, results){
      //     db.Message.create({
      //       userid: results[0].dataValues.id,
      //       text: req.body.message,
      //       roomname: req.body.roomname
      //     }).complete(function(err, results){
      //       res.sendStatus(201);
      //     });
      //   });
    }
  }

};

