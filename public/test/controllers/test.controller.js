(function () {
  'use strict';

  angular
  .module('test')
  .controller('TestController', TestController);

  TestController.$inject = ['Test', '$state', '$timeout', '$scope'];

  function TestController(Test, $state, $timeout, $scope) {
    var vm = this;
    
    function initialize() {
      console.log('initialize test controller');
      console.log(Test);
      Test.serviceTest();
    }

    initialize();
  }
})();
