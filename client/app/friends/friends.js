angular.module('howWasIt.friends', [])

.controller('FriendsController', function ($scope, $http) {
  $scope.userFriends = [
    // Test Friends, REMOVE AT SOME POINT
    {id: 1,
     username: 'brettkan',
     email: 'abc@gmail.com',
     first_name: 'brett',
     last_name: 'kan',
     password: 'asfd'},
    {id: 2,
     username: 'joshturn',
     email: 'joshturn@gmail.com',
     first_name: 'josh',
     last_name: 'turner',
     password: 'qqqq'},
  ];

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



  $scope.getFriendList();
});
