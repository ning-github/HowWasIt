var db = require('../config');
var User = require('./user.js');

var User_Connection = db.Model.extend({
  tableName: 'user_connections',
  hasTimestamps: true,

});

module.exports = User_Connection;
