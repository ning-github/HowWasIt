angular.module('howWasIt.services', [])

.service('checkLoggedIn', function($http, $q, $state){
  
  var deferred = $q.defer();

  $http.get('/loggedIn').success(function(user){

    if (user){
      deferred.resolve();
    } else {
      console.log("You need to log in.");
      deferred.reject();
      $state.go('login');
    }
  })
})