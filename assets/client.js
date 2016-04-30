angular
  .module('couch', ['ui.router'])
  .config(config)
;

function config($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
}
