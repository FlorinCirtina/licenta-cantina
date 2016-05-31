(function () {
  'use strict';

  angular
  .module('test')
  .controller('TestController', TestController);

  TestController.$inject = ['Login', '$state', '$timeout', '$scope', '$window'];

  function TestController(Login, $state, $timeout, $scope, $window) {
    var vm = this;
    
    function initialize() {
      console.log(Login.getLoggedUser());
    }

    initialize();
  }
})();
