angular.module('howWasIt.topfive', [])

.factory('Reviews', function ($http){

	var getAll = function(){
		return http$({
			method: 'GET',
			url: 'fillMeIn'//path to db
		})
		.then(function(res){
			return res.data;
		});
	};

	return {
      getAll: getAll
  };
})


.controller('TopFiveController', function($scope, Reviews){

	$scope.data = {};

	$scope.getReviews = function () {
		Reviews.getAll()
		  .then(function(reviews){
		  	$scope.data.reviews = reviews.body;
		  })
		  .catch(function (error){
		  	console.log
		  })
	};
});
