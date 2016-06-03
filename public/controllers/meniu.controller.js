(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('MeniuController', MeniuController);

  MeniuController.$inject = ['$state', '$scope'];

  function MeniuController($state, $scope) {
    var vm = this;

    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
