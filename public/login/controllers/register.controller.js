(function () {
  'use strict';

  angular
  .module('login')
  .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['Login', '$state', '$scope'];

  function RegisterController(Login, $state, $scope) {
    var vm = this;
    vm.user = {};

    vm.register = function() {
      console.log(vm.user);
      Login.create('/register', vm.user)
        .then(function success(result) {
          vm.user = {};
          console.log('result', result);
        }, function error(err) {
          console.log('err', err);
        })
    }
    vm.navigateTo = function(courseId) {
      $state.go('login');
    };

  }
})();
