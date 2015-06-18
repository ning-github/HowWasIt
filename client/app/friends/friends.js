angular.module('howWasIt.friends', [])

.controller('LinksController', function ($scope, $http, Links) {
  $scope.userFriends = [];

  $scope.getFriendList = function() {
    return $http({
      method: 'GET',
      // We will need to add a reference to a session name? cookie? something to id the user.
      url: '/getFriendList'
    })
    .then(function(resp) {
      // Expect resp.users to be an array of user objects
      resp.users.forEach(function(user) {
        $scope.userFriends.push(user);
      });
    });

  };

  // $scope.getLinks = function() {
  //   Links.getLinks().then(function(data) {
  //     $scope.data.links = data;
  //   });
  // };

  // $scope.init = function() {
  //   $scope.getLinks();
  // };

  // $scope.redirectUrl = function(code){
  //   Links.redirectUrl(code);
  // };

  $scope.getFriendList();
});
