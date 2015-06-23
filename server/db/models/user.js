var db = require('../config');
var Review = require('./review.js');
var UserConnection = require('./userConnection.js');
//var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  review: function() {
    return this.hasMany(Review);
  },

  friends: function() {
    return this.belongsToMany(User, 'user_connections', 'user_id', 'friend_user_id');
  },

  // validPassword: function(password){
  //   bcrypt.hash(password, null, null, function(err, hash){
  //     if (err) { console.log('Error hashing password: ', err); }
  //     bcrypt.compare(password, hash, function(err, result){
  //       if (err){ console.log("Error checking password: ", err); }
  //       return result;
  //     });
  //   });
  // }

});

module.exports = User;
