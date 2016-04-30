angular
  .module('couch')
  .controller('RoomCtrl', RoomCtrl)
;

function RoomCtrl($stateParams, Socket) {
  var vm = this;
  vm.roomName = $stateParams.roomName;

  Socket.emit('joinRoom', vm.roomName);

  vm.setVideo = function (inputUrl) {
    vm.currentUrl = inputUrl;
    Socket.emit('setVideoOnServer', inputUrl);
  };

  Socket.on('setVideoOnClient', function (inputUrl) {
    console.log('setVideoOnClient response: ', inputUrl);
    vm.currentUrl = inputUrl;
  });
}
