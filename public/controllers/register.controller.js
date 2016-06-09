(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['Login', '$state', '$scope'];

  function RegisterController(Login, $state, $scope) {
    var vm = this;
    vm.user = {};

    vm.register = function() {
      Login.create('/register', vm.user)
        .then(function success(result) {
          Login.setUser(result.data);
          $state.go('home');
        }, function error(err) {
          console.log('err', err);
        })
    }
    vm.navigateTo = function(courseId) {
      $state.go('login');
    };

  }
})();
