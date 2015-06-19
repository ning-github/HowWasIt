angular.module('howWasIt.map', [])

.controller('MapController', function($scope){
  window.initialize = function(){
    var mapOptions = {
      center: {lat: -25, lng: 131},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(-25.5, 131.5),
      map: map,
      title: 'test marker 1'
    });

    var marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(-25.25, 131.25),
      map: map,
      title: 'test marker 2'
    });

    // attaching data to $scope object
    $scope.map = map;

    // handle searches for places
    var input = document.getElementById('search-box');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(input);

    var markers = [];

    google.maps.event.addListener(searchBox, 'places_changed', function(){
      var places = searchBox.getPlaces();
    });


  };

  // for async loading
  var loadScript = function(){
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false?v=3.exp' + '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
  };


  // invoke
  loadScript();

  // if were to use API key: "https://maps.googleapis.com/maps/api/js?key="
});