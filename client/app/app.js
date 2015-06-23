angular.module('howWasIt', [
  'howWasIt.map',
  'howWasIt.friends',
  'howWasIt.topfive',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url:"/home",
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    });
});
