angular.module('howWasIt.login', [])

.controller('LoginController', function ($scope, $http, $state) {

  $scope.loginUser = function() {
    var userObj = {username: $scope.usernameInput, password: $scope.passwordInput};
    return $http({
      method: 'POST',
      url: '/login',
      data: userObj
    }).success(function(data, status, headers, config){
      $state.go('home');
    }).error(function(data, status, headers, config){
      console.log(data);
      $state.go('login');
    })
  };

});
