angular
  .module('couch')
  .factory('Socket', Socket)
;

function Socket(socketFactory) {
  return socketFactory();
}
