angular.module('howWasIt.map', [])
.factory('Map', function($window, $q){
  // the deferred object
  var mapDeferred = $q.defer();

  // the api url - note that callback= is left hanging
  var apiUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false?v=3.exp&signed_in=true&callback=';
  // if were to use API key: "https://maps.googleapis.com/maps/api/js?key="

  // function to load script
  var loadScript = function(apiUrl, callback){
    var script = document.createElement('script');
    // concat function name to url (so the script will run that callback function)
    script.src = apiUrl + callback;
    document.body.appendChild(script);
  };

  $window.mapInitialized = function(){
    // resolves the promise (see line 30) - in this case, means the map has been loaded
    //   this is where the deferred object can signal completion. 
    //   - the .then() promise structure (line 29) will hinge upon this resolution of the deferred object    
    mapDeferred.resolve();
  };

  // the actual ACTION of loading the API script, which resolves the promise upon completion
  loadScript(apiUrl, 'mapInitialized');

  return {
    // usage: Map.mapReady.then(callback) 
    mapReady: mapDeferred.promise
  };

})

.controller('MapController', function($scope, Map){
  // attaching data to $scope object
  $scope.map = 0;
  // example options
  var mapOptions = {
    // eventually can geocode for center
    center: {lat: 37.78385, lng: -122.40868},
    zoom: 8
  };
  Map.mapReady.then(function(){
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  })
});

/* mapOptions will be the specific data passed to a map (coords, etc) 

var loadMap = function(){

  $window.initialize = function(){
    var mapOptions = {
      // eventually can geocode for center
      center: {lat: 37.78385, lng: -122.40868},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // handle searches for places
    var input = document.getElementById('search-box');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(input);

    var markers = [];

    google.maps.event.addListener(searchBox, 'places_changed', function(){
      var places = searchBox.getPlaces();
    });


    return map;
  };
};


*/