angular
  .module('couch')
  .controller('HomeCtrl', HomeCtrl)
;

function HomeCtrl() {
  var ROOMNAME_LENGTH = 20;
  var vm = this;
  vm.roomName = '';
  vm.hasRandomName = false;

  angular.element(document.getElementById('room-name-input')).focus();

  vm.generateRandomRoomName = function (length) {
    var roomName = '';
    var possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      roomName += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return roomName;
  };

  vm.setRandomRoomName = function () {
    vm.roomName = vm.generateRandomRoomName(ROOMNAME_LENGTH);
    vm.hasRandomName = true;
  };

  vm.conditionallySetRandomRoomName = function () {
    if (vm.roomName === '') {
      vm.setRandomRoomName();
    }
  };

  vm.clearRoomName = function () {
    vm.roomName = '';
    vm.hasRandomName = false;
  };

  vm.conditionallyClearRoomName = function () {
    if (vm.hasRandomName) {
      vm.clearRoomName();
    }
  };
}
