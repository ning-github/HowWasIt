angular.module('howWasIt.login', [])

.controller('LoginController', function ($scope, $http, $state) {

  $scope.loginUser = function() {
    var userObj = {username: $scope.usernameInput, password: $scope.passwordInput};
    $state.go('home');
    return $http({
      method: 'POST',
      url: '/login',
      data: userObj
    }).then(function(res){
      //TODO: finish this function
    })
  };

});
