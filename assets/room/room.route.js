angular
  .module('couch')
  .config(roomRoute)
;

function roomRoute($stateProvider) {
  $stateProvider
    .state('room', {
      url: '/room/:roomName',
      templateUrl: 'room/room.html',
      controller: 'RoomCtrl as vm',
    })
  ;
}
