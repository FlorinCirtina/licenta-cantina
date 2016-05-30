(function () {
  'use strict';

  angular
  .module('login')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['Login','$state', '$scope', '$window'];

  function LoginController(Login, $state, $scope, $window) {
    var vm = this;
    vm.user = {};
    vm.login = function() {
      console.log(111);

      Login.create('/signin', vm.user)
        .then(function success(result) {
          console.log('result', result);
          $window.sessionStorage.user = JSON.stringify(result.data)
          vm.user = {};
        }, function error(err) {
          console.log('err', err);

        });

    }

    vm.navigateTo = function(courseId) {
      $state.go('register');
    };
  }
})();
