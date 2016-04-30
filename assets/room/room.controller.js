angular
  .module('couch')
  .controller('RoomCtrl', RoomCtrl)
;

function RoomCtrl($stateParams, Socket, $scope) {
  var vm = this;
  vm.roomName = $stateParams.roomName;

  Socket.emit('joinRoom', vm.roomName);

  /* set video */
  vm.setVideo = function (inputUrl) {
    Socket.emit('setVideoOnServer', inputUrl);
  };

  Socket.on('setVideoOnClient', function (inputUrl) {
    vm.currentUrl = inputUrl;
  });

  /* play video */
  $scope.$on('youtube.player.playing', function () {
    vm.playVideo();
  });

  vm.playVideo = function () {
    Socket.emit('playVideo');
  };

  Socket.on('playVideo', function () {
    $scope.player.playVideo();
  });

  /* pause video */
  $scope.$on('youtube.player.paused', function () {
    vm.pauseVideo();
  });

  vm.pauseVideo = function () {
    Socket.emit('pauseVideo');
  };

  Socket.on('pauseVideo', function () {
    $scope.player.pauseVideo();
  });

  /* on destroy */
  vm.onDestroy = function () {
    Socket.emit('leaveRoom', vm.roomName);
  };

  $scope.$on('$destroy', vm.onDestroy);
}
