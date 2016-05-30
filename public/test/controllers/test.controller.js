(function () {
  'use strict';

  angular
  .module('test')
  .controller('TestController', TestController);

  TestController.$inject = [ '$state', '$timeout', '$scope', '$window'];

  function TestController( $state, $timeout, $scope, $window) {
    var vm = this;
    
    function initialize() {
      console.log(JSON.parse($window.sessionStorage.user || null));
    }

    initialize();
  }
})();
