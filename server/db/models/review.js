var db = require('../config');
var User = require('./user.js');

var Review = db.Model.extend({
  tableName: 'reviews',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User);
  },
});

module.exports = Review;
