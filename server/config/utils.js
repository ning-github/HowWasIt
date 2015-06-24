var app = require('../myServer.js');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  createToken: function(req, res, userModel) {
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: userModel.attributes.id,
      exp: expires
    }, 'secretString');
     
    res.status(200).json({
      token : token,
      expires: expires,
      user: userModel.toJSON()
    });
  },

  decodeToken: function(req, res, userModel) {
    
  }

};