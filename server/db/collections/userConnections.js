var db = require('../config');
var UserConnection = require('../models/UserConnection');

var UserConnections = new db.Collection();

UserConnections.model = UserConnection;

module.exports = UserConnections;
