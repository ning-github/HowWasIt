angular.module('howWasIt.login', [])

.controller('LoginController', function ($scope, $http, $state, Session) {

  $scope.loginUser = function() {
    var userObj = {username: $scope.usernameInput, password: $scope.passwordInput};
    return $http({
      method: 'POST',
      url: '/login',
      data: userObj
    }).success(function(data, status, headers, config){
      Session.authToken = data.token;

      // TODO: This can be more elegant
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      $state.go('home');
    }).error(function(data, status, headers, config){
      console.log(data);
      $state.go('login');
    });
  };

});
