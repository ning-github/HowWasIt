angular.module('howWasIt.map', [])
.factory('Map', function($window, $q, $http){

  var commonMap = function(){
    // the deferred object
    var mapDeferred = $q.defer();

    // the api url - note that callback= is left hanging
    var apiUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false?v=3.exp&signed_in=true&callback=';
    // if were to use API key: "https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE"

    // function to load script
    var loadScript = function(apiUrl, callback){
      var script = document.createElement('script');
      // concat function name to url (so the script will run that callback function)
      script.src = apiUrl + callback;
      document.body.appendChild(script);
    };

    $window.mapInitialized = function(){
      // resolves the promise (see line 29) - in this case, means the map has been loaded
      //   this is where the deferred object can signal completion. 
      //   - the .then() promise structure (line 31) will hinge upon this resolution of the deferred object    
      mapDeferred.resolve();
    };

    // the actual ACTION of loading the API script, which resolves the promise upon completion
    loadScript(apiUrl, 'mapInitialized');

    return mapDeferred.promise;
  }; 

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
    commonMap: commonMap,
    addReview: addReview,
    extractData: extractData
  }

})

.controller('ApiLoadController', function($scope, $rootScope, Map){
  var mapOptions = {
    // eventually can geocode for center
    center: {lat: 37.78385, lng: -122.40868},
    zoom: 16
  };
  Map.commonMap().then(function(){
    // $rootScope is shared by all controllers
    $rootScope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  });
})

.controller('MapController', function($scope, $rootScope, $http, Map, Session){
  $rootScope.markers = [];

  // Map.commonMap().then(function(){
  //   // $rootScope is shared by all controllers
  //   $rootScope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
          // can have marker store MORE information (such as places' unique ID)
          placeId: place.place_id
        });

        bounds.extend(place.geometry.location);
        $rootScope.markers.push(marker);
      }
      // TODO: set up form for attaching a review

      $rootScope.map.fitBounds(bounds);
      console.log('this is a places object: ', places[0]);
      

      // console.log('before: ', $rootScope.myPlaces);
      // // use unique ID to store, since different places could have same name
      // $rootScope.myPlaces[places[0].id] = places[0];

      console.log('my own markers: ', $rootScope.markers);

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

  // });

});