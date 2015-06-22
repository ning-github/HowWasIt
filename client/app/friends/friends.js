angular.module('howWasIt.friends', [])

.controller('FriendsController', function ($scope, $rootScope, $http) {
  $rootScope.friendMarkers = {};
  $scope.userFriends = {};

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
      resp.data.forEach(function(user) {
        $scope.userFriends[user.id] = user;
      });
    });
  };

  $scope.searchMembers = function(query) {
    return $http({
      method: 'GET',
      url: '/friends/searchMembers?query=' + query
    })
    .then(function(resp) {
      // Expect resp to be an array of user objects
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

  $scope.makeMarker = function(place) {
    var location = {};

    location.marker = new google.maps.Marker({
      map: $rootScope.map,
      position: place.position,
      title: place.title,
      animation: google.maps.Animation.Drop
    });

    location.contentString = "<div><h1>" + place.name + "</h1></div>";

    location.infoWindow = new google.maps.InfoWindow({
      content: location.contentString
    });

    google.maps.event.addListener(location.marker, "click", function() {
      location.infoWindow.open($rootScope.map, location.marker);
    });

    return location;
  };

  $scope.removeReviews = function() {
    for (var i = 0; i < $rootScope.friendMarkers.locations.length; i++) {
      $rootScope.friendMarkers.locations[i].setMap(null);
    }
  };

  $scope.addFriendReviews = function(userObj) {
    // TODO: Add function to show just friend's comments on the map
    // TODO: Fix bug so map doesn't show user's comments on 'remove friend' button click
    console.log(userObj);

    $scope.removeReviews();

    $rootScope.friendMarkers.locations = [];

    for (var i = 0; i < userObj.places.length; i++) {
      $rootScope.friendMarkers.locations.push($scope.makeMarker(userObj.places[i]));
    }
  };



  $scope.getFriendList();
});




