module.exports = {

  createSession: function(req, res, userModel) {
    req.session.regenerate(function(err){
      if (err) {
        console.log('Error creating new session: ', err);
      }
      req.session.cookie.user = userModel;
      console.log('REQ.SESSION AFTER LOGIN: ', req.session);
    });
  }

};