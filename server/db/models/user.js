var db = require('../config');
var Review = require('./review.js');
var User_Connection = require('.user_connection.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  review: function() {
    return this.hasMany(Review);
  },

  friend: function() {
    return this.belongsToMany(User, 'user_connections', 'user_id', "friend_user_id").through(User_Connection);
  }
});

module.exports = User;
