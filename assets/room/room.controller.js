angular
  .module('couch')
  .controller('RoomCtrl', RoomCtrl)
;

function RoomCtrl($stateParams) {
  var vm = this;
  vm.roomName = $stateParams.roomName;
}
