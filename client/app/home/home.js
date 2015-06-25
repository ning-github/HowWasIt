angular.module('howWasIt.home', [])

.controller('HomeController', function ($scope, $rootScope, $http, AuthFactory, Session) {

  $scope.logout = function() {
    Session.destroy();
  };

});




