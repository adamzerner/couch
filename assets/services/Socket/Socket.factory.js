angular
  .module('tatertot')
  .factory('Socket', Socket)
;

function Socket(socketFactory) {
  return socketFactory();
}
