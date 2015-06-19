var db = require('../config');
var User = require('./user.js');

var UserConnection = db.Model.extend({
  tableName: 'user_connections',
  hasTimestamps: true,

});

module.exports = UserConnection;
