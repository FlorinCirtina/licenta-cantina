(function() {
  'use strict';

  angular
  .module('cantina')
  .directive('navBarDirective', NavBarDirective);


  NavBarDirective.$inject = ['Login', '$state','$stateParams', '$http'];

  function NavBarDirective(Login, $state, $stateParams, $http) {
    return {
      restrict: 'E',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      templateUrl: 'templates/navbar.html',
      controller: function($scope) {
        var vm = this;
        vm.user = Login.getLoggedUser();
        vm.logOut = function() {
          Login.get('/signout')
            .then(function success(result) {
              Login.destroyUser();
              vm.user = Login.getLoggedUser();
              $state.go('login');
            });
        }

        vm.navigateTo = function(state) {
          $state.go(state);
        };
      }
    }
  }
})();
