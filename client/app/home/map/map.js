angular.module('howWasIt.map', [])
.factory('Map', function($window, $q, $http){

  var addReview = function(data, userId) {
    return $http({
      method: 'POST',
      url: '/reviews/handleReviews?user_id=' + userId,
      data: data
    });
  };

  var extractData = function(data) {
    var result = {};

    result.name = data.name;
    result.latitude = data.geometry.location.A;
    result.longitude = data.geometry.location.F;
    result.reviewText = data.reviewText;
    return result;
  }

  return {
    addReview: addReview,
    extractData: extractData
  }

})

.controller('MapController', function($scope, $rootScope, $http, Map, Session){
  $rootScope.markers = [];
    var mapOptions = {
      // eventually can geocode for center
      center: {lat: 37.78385, lng: -122.40868},
      zoom: 16
    };

  // create Map
  $rootScope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // tie the searchbox to places library
    var input = document.getElementById('search-box');
    //$rootScope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(input);

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var bounds = new google.maps.LatLngBounds();

      // create a marker
      for (var i = 0, place; place = places[i]; i++) {
        var marker = new google.maps.Marker({
          map: $rootScope.map,
          title: place.name,
          position: place.geometry.location,
          placeId: place.place_id
        });

        bounds.extend(place.geometry.location);
        $rootScope.markers.push(marker);
      }

      $rootScope.map.fitBounds(bounds);

      //Adding data the the server from nav bar dropdown
      $scope.reviewSubmit = function(){
        var reviewText = $scope.reviewText;
        places[0].reviewText = reviewText;
        Map.addReview(Map.extractData(places[0]), Session.id);
        // clear fields and pop dropdown back up
        $('.dropdown.open').removeClass('open');
        $('#search-box, .review-text').val('');
      }

    });

});