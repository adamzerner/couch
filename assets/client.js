angular
  .module('couch', ['ui.router', 'youtube-embed', 'btford.socket-io', 'ui.bootstrap'])
  .config(config)
  .run(run)
;

function config($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
}

function run($rootScope) {
  $rootScope.alert = {};
  $rootScope.closeAlert = function () {
    $rootScope.alert = {};
  };
}
