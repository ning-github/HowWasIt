var app = require('../myServer');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  createToken: function(req, res, userModel) {
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      iss: userModel.attributes.id,
      exp: expires
    }, app.app.get('jwtTokenSecret'));

    res.status(200).json({
      token : token,
      expires: expires,
      user: userModel.toJSON()
    });
  },

  decodeToken: function(req, res, userModel) {
    var token = req.headers['x-access-token'];
    var tokenData = jwt.decode(token, app.app.get('jwtTokenSecret'));

    // if (tokenData.iss === )
  }

};