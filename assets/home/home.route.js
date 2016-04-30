angular
  .module('couch')
  .config(homeRoute)
;

function homeRoute($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl as vm',
    })
  ;
}
