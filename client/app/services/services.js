angular.module('howWasIt.services', [])

.factory('AuthFactory', function($http, $q, $state, Session, localStorageService){

  var setToken = function(token) {
    token = token || localStorageService.get('howWasItJwtToken');
    localStorageService.set('howWasItJwtToken', token);
  };

  var removeToken = function() {
    localStorageService.remove('howWasItJwtToken');
  };

  var loginOrSignUp = function(userObj, url){
    return $http({
        method: 'POST',
        url: '/'+url,
        data: userObj
      }).success(function(data, status, headers, config){
        Session.create(data.user.id, data.user.first_name, data.user.last_name, data.user.email);
        setToken(data.token);
        $state.go('home');
      });
  };

  // in our app, authentication grants authorization (since permissions all the same)
  var isAuthenticated = function(){
    return !!Session.userId;
  };
  
  var checkLoggedIn = function() {  
    var deferred = $q.defer();

    $http.get('/loggedIn').success(function(user){

      if (user){
        deferred.resolve();
      } else {
        console.log("You need to log in.");
        deferred.reject();
        $state.go('login');
      }
    });
  };

  var logout = function() {
    Session.destroy();
    removeToken();
    $state.go('login');
  };

  return {
    setToken: setToken,
    removeToken: removeToken,
    checkLoggedIn: checkLoggedIn,
    isAuthenticated: isAuthenticated,
    loginOrSignUp: loginOrSignUp,
    logout: logout
  };

})

.factory('AttachTokens', function (localStorageService) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = localStorageService.get('howWasItJwtToken');
      if (jwt) {
        // Format of header is authorization[Bearer: token]... Required for express-jwt
        object.headers.Authorization = 'Bearer ' + jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.service('Session', function(localStorageService) {
  // for log in
  this.create = function(userId, firstName, lastName, email){
    console.log('HERE ARE THE DETAILS: ', userId, firstName, lastName, email);

    var userDetails = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    for (var key in userDetails) {
      this[key] = userDetails[key];
    }

    localStorageService.set('howWasItSession', JSON.stringify(userDetails));
  };

  // for log out
  this.destroy = function(){
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    localStorageService.remove('howWasItSession');
  };

  this.restoreIfExisting = function() {
    var stored = localStorageService.get('howWasItSession');
    if (stored) {
      var userDetails = JSON.parse(stored);
      this.create(userDetails.id, userDetails.firstName, userDetails.lastName, userDetails.email);
    }
  };
});

