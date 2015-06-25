angular.module('howWasIt.signup', [])

.controller('SignupController', function ($scope, $http, $state, Session) {

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
    .success(function(data, status, headers, config){
      console.log('DATA: ', data);
      Session.authToken = data.token;
      // user_id obtained from created token and user model on signup
      var userId = data.user.id;
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;

      $state.go('home');
    });
  };



});
