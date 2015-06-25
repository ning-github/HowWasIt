angular.module('howWasIt.home', [])

.controller('HomeController', function ($scope, $rootScope, $http, AuthFactory, Session) {

  $scope.loggedInUser = Session.firstName;

  $scope.logout = function() {
    AuthFactory.logout();
  };

  // Upon loading HomeController, create token and restore session if already in LocalStorage
  // TODO: Possibly move this somewhere more universal. This only runs when user hits home page, not other pages
  AuthFactory.setToken();
  Session.restoreIfExisting();
});




