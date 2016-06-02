(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('UserController', UserController);

  UserController.$inject = ['Login', '$state', '$timeout', '$scope', '$window'];

  function UserController(Login, $state, $timeout, $scope, $window) {
    var vm = this;
    
    function initialize() {
      console.log(Login.getLoggedUser());
    }

    initialize();
  }
})();
