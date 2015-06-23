angular.module('howWasIt.login', [])

.controller('LoginController', function ($scope, $rootScope, $state) {

  $scope.goToHome = function() {
    $state.go('home');
  };

});
