angular.module('howWasIt.home', [])

.controller('HomeController', function ($scope, $rootScope, $http, AuthFactory, Session) {

  $scope.logout = function() {
    AuthFactory.logout();
  };

  // Upon loading HomeController, create token if token already in LocalStorage
  AuthFactory.setToken();
});




