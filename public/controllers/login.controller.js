(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['Login','$state', '$scope', '$window'];

  function LoginController(Login, $state, $scope, $window) {
    var vm = this;
    vm.user = {};
    vm.login = function() {
      Login.create('/signin', vm.user)
        .then(function success(result) {
          Login.setUser(result.data);
          vm.user = {};
          // $state.go('test');

        }, function error(err) {
          console.log('err', err);
        });
    }

    vm.navigateTo = function(courseId) {
      $state.go('register');
    };
  }
})();
