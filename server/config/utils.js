var app = require('../myServer.js');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  createToken: function(req, res, userModel) {
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: userModel.attributes.username,
      exp: expires
    }, 'secretString');
     
    res.json({
      token : token,
      expires: expires,
      user: userModel.toJSON()
    });
  }

};