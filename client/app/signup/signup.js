angular.module('howWasIt.signup', [])

.controller('SignupController', function ($scope, $state, $http) {

  $scope.createNewUser = function() {
    var userObj = {
      username: $scope.usernameInput, 
      password: $scope.passwordInput, 
      first_name: $scope.firstNameInput,
      last_name: $scope.lastNameInput,
      email: $scope.emailInput
    };
    console.log(userObj);
    return $http({
      method: 'POST',
      url: '/signup',
      data: userObj
    })
    .then(function(res){
      $state.go('home');
      console.log(res);
    });
  };



});
