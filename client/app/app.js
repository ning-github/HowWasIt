angular.module('howWasIt', [
  'howWasIt.login',
  'howWasIt.home',
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
    })
    .state('login', {
      url:"/login",
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    });
});
