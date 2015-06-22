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
     {id: 3,
      username: 'ningxia',
      email: 'ningxia@gmail.com',
      first_name: 'ning',
      last_name: 'xia',
      password: 'abcd'}
  ];

  $scope.searchMembersResults = [
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
      {id: 3,
       username: 'ningxia',
       email: 'ningxia@gmail.com',
       first_name: 'ning',
       last_name: 'xia',
       password: 'abcd'}
  ];

  $scope.getFriendList = function() {
    var userId = 1;  // TODO: We will need to add a reference to a session name? cookie? something to id the user.

    return $http({
      method: 'GET',
      url: '/friends/getFriendList?user_id=' + userId
    })
    .then(function(resp) {
      // Expect resp.users to be an array of user objects
      resp.users.forEach(function(user) {
        $scope.userFriends.push(user);
      });
    });
  };

  $scope.searchMembers = function(query) {
    return $http({
      method: 'GET',
      url: '/friends/searchMembers?query=' + query
    })
    .then(function(resp) {
      // Expect resp.users to be an array of user objects
      resp.users.forEach(function(user) {
        $scope.searchMembersResults.push(user);
      });
    });
  };

  $scope.addFriend = function(userObj) {
    var userId = 1;  // TODO: We will need to add a reference to a session name? cookie? something to id the user.
    
    return $http({
      method: 'POST',
      url: '/friends/addFriend?user_id=' + userId,
      data: userObj
    })
    .then(function(resp) {
      console.log(resp);
    });
  };

  $scope.removeFriend = function(userObj) {
    var userId = 1;  // TODO: We will need to add a reference to a session name? cookie? something to id the user.
    
    return $http({
      method: 'POST',
      url: '/friends/removeFriend?user_id=' + userId,
      data: userObj
    })
    .then(function(resp) {
      console.log(resp);
    });
  };

  $scope.mapUserComments = function(userObj) {
    // TODO: Add function to show just friend's comments on the map
    // TODO: Fix bug so map doesn't show user's comments on 'remove friend' button click
    console.log(userObj);
  };



  $scope.getFriendList();
});




