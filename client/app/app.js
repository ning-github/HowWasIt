angular.module('howWasIt', [
  'howWasIt.login',
  'howWasIt.signup',
  'howWasIt.home',
  'howWasIt.map',
  'howWasIt.friends',
  'howWasIt.topfive',
  'howWasIt.services',
  'LocalStorageModule',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/login");
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
    })
    .state('signup', {
      url:"/signup",
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    });
});
