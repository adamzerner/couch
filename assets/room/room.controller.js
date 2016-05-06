angular
  .module('tatertot')
  .controller('RoomCtrl', RoomCtrl)
;

function RoomCtrl($stateParams, Socket, $scope, $rootScope) {
  var vm = this;
  vm.roomName = $stateParams.roomName;

  Socket.emit('joinRoom', vm.roomName);
  Socket.on('joinedRoom', function () {
    $rootScope.alert = {
      message: 'Someone joined this room.',
      type: 'info',
    };
  });

  /* set video */
  vm.setVideo = function (inputUrl) {
    Socket.emit('setVideoOnServer', inputUrl);
  };

  Socket.on('setVideoOnClient', function (inputUrl) {
    vm.currentUrl = inputUrl;
  });

  $scope.$on('youtube.player.ready', function () {
    vm.hourLong = $scope.player.getDuration() > (60 * 60);
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

  /* skip to */
  vm.skipTo = {
    go: function () {
      var hour = Number(vm.skipTo.hour) || 0;
      var minute = Number(vm.skipTo.minute) || 0;
      var second = Number(vm.skipTo.second) || 0;

      var seconds = (hour * 60 * 60) + (minute * 60) + second;
      Socket.emit('skipTo', seconds);
    },
  };

  Socket.on('skipTo', function (seconds) {
    $scope.player.seekTo(seconds);
  });

  /* on destroy */
  vm.onDestroy = function () {
    Socket.emit('leaveRoom', vm.roomName);
  };

  $scope.$on('$destroy', vm.onDestroy);
}
