(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('UserController', UserController);

  UserController.$inject = ['Util','Login', '$state', '$timeout', '$scope', '$window'];

  function UserController(Util, Login, $state, $timeout, $scope, $window) {
    var vm = this;
    vm.user = Login.getLoggedUser()

    vm.updateUser = function() {
      var userId = vm.user._id;
      var url = '/api/user/'+userId;
      Util.update(url, vm.user)
        .then(function success(result) {
          Login.setUser(result.data);
        }, function error(err) {
          console('err', err)
        })
    }
  }
})();
