var db = require('../config');
var Review = require('./review.js');
var UserConnection = require('./userConnection.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  review: function() {
    return this.hasMany(Review);
  },

  friends: function() {
    return this.belongsToMany(User, 'user_connections', 'user_id', "friend_user_id");
  }

});

module.exports = User;
