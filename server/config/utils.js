var app = require('../myServer.js');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  // createSession: function(req, res, userModel) {
  //   req.session.regenerate(function(err){
  //     if (err) {
  //       console.log('Error creating new session: ', err);
  //     }
  //     req.session.cookie.user = userModel;
  //     console.log('REQ.SESSION AFTER LOGIN: ', req.session);
  //   });
  // },

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