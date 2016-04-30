angular
  .module('couch')
  .controller('HomeCtrl', HomeCtrl)
;

function HomeCtrl() {
  var vm = this;

  vm.generateRandomRoomName = function (length) {
    var roomName = '';
    var possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      roomName += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return roomName;
  };

  vm.roomName = vm.generateRandomRoomName(20);
}
