angular
  .module('couch', [])
  .controller('MainCtrl', MainCtrl)
;

function MainCtrl() {
  var vm = this;
  vm.foo = 'bar';
}
