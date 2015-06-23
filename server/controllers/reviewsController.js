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

  handleReviews: {
    get: function(req, res) {
      var userId = url.parse(req.url).query.split('=')[1];

      Review.forge().where({user_id: userId}).fetchAll()
        .then(function(model) {
        // see user database model 
        console.log(model);
        res.status(200).send(model);
      });
    },
    post: function(req, res) {
      var userId = url.parse(req.url).query.split('=')[1]; // url format: /friends/getFriendList?user_id=123

      console.log("*************Review*************");
      console.log(userId);
      console.log(req.body);

      var newReview = new Review({
        user_id: userId,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        google_loc_name: req.body.name
      });

      console.log(newReview);

      newReview.fetch().then(function(found) {
        if (found) {
          res.status(200).send('You have already reviewed this place!!');
        } else {
          newReview.save().then(function(review) {
            // newReview.add(review);
            // Send back friend so that client can add to friendList?
            res.status(200).send(review);
          });
        }
      });

    }
  },





};