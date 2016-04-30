angular
  .module('couch', ['ui.router', 'youtube-embed', 'btford.socket-io'])
  .config(config)
;

function config($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
}
