angular.module('howWasIt.home', [])

.controller('HomeController', function ($scope, $rootScope, $http, AuthFactory, Session) {

  $scope.loggedInUser = Session.firstName;

  $scope.currentUserId = Session.id;
  $scope.logout = function() {
    for (var i = 0; i < $rootScope.friendMarkers.length; i++) {
      $rootScope.friendMarkers[i].setMap(null);
    }
    for (var i = 0; i < $rootScope.markers.length; i++) {
      $rootScope.markers[i].setMap(null);
    };
    AuthFactory.logout();
  };

  // Upon loading HomeController, create token and restore session if already in LocalStorage
  // TODO: Possibly move this somewhere more universal. This only runs when user hits home page, not other pages
  AuthFactory.setToken();
  Session.restoreIfExisting();
});




