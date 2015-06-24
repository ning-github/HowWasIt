var db = require('../config');
var Review = require('./review.js');
var UserConnection = require('./userConnection.js');
var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  review: function() {
    return this.hasMany(Review);
  },

  friends: function() {
    return this.belongsToMany(User, 'user_connections', 'user_id', 'friend_user_id');
  },

  validPassword: function(attemptedPassword, storedPassword){
    return bcrypt.compareAsync(attemptedPassword, storedPassword)
    // .then(function(result) {
    //   return result;
    // });
  }

});

module.exports = User;
