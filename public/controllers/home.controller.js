(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['Login','$state', '$scope'];

  function HomeController(Login, $state, $scope) {
    var vm = this;
    vm.user = Login.getLoggedUser();
    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
