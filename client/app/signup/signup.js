angular.module('howWasIt.signup', [])

.controller('SignupController', function ($scope, $rootScope, $state) {

  $scope.createNewUser = function() {
    $state.go('home');
  };

});
