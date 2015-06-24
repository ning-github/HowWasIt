angular.module('howWasIt.friends', [])

.controller('FriendsController', function ($scope, $rootScope, $http) {
  $rootScope.friendMarkers = {};
  $scope.userFriends = {};
  $scope.searchMembersResults = [];

  $scope.getFriendList = function() {
    var userId = 1;  // TODO: We will need to add a reference to a session name? cookie? something to id the user.

    return $http({
      method: 'GET',
      url: '/friends/getFriendList?user_id=' + userId
    })
    .then(function(resp) {
      // Expect resp.data to be an array of user objects
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
      // Expect resp.data to be an array of user objects
      $scope.searchMembersResults = [];
      resp.data.forEach(function(user) {
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
      $scope.searchMembersResults = [];
      console.log(resp.data);
      $scope.getFriendList();
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
      delete $scope.userFriends[resp.data.friendId];
    });
  };

  $scope.makeMarker = function(place) {
    var location = {};

    location.marker = new google.maps.Marker({
      map: $rootScope.map,
      position: new google.maps.LatLng(place.latitude, place.longitude),
      title: place.google_loc_name,
      animation: google.maps.Animation.Drop
    });

    location.contentString = "<div><h5>" + place.google_loc_name + "</h5><hr><h5>"+place.review_text+"</h5></div>";

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
    // console.log(userObj);

    // $scope.removeReviews();

    // $rootScope.friendMarkers.locations = [];

    // for (var i = 0; i < userObj.places.length; i++) {
    //   $rootScope.friendMarkers.locations.push($scope.makeMarker(userObj.places[i]));
    // }
    var userId = userObj.id;

    return $http({
      method: 'GET',
      url: '/reviews/handleReviews?user_id=' + userId
    })
    .then(function(resp) {
      // Expect resp.data to be an array of user objects
      console.log(resp);
      resp.data.forEach(function(review) {
        $scope.makeMarker(review);
        console.log(review);
      });
    });
  };



  $scope.getFriendList();
});




