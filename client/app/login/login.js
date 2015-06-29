angular.module('howWasIt.login', [])

.controller('LoginController', function ($scope, $http, $state, AuthFactory, Session) {

  $scope.loginUser = function() {
    var userObj = {username: $scope.usernameInput, password: $scope.passwordInput};
    AuthFactory.loginOrSignUp(userObj, 'login')
      .error(function(){
        // incorrect login credentials. clear fields to reattempt
        $scope.failed = true;
        $scope.usernameInput = '';
        $scope.passwordInput = '';
      }); 
  };

});


