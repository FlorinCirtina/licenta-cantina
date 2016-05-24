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


    // $scope.$on('finishedRender', function() {
    //   vm.showContent = true;
    //   Metronic.init();
    //   initTableGrid();
    //   angular.element("[data-toggle='tooltip']").tooltip();
    // }); /* trigger after DOM is rendered*/

  }
})();
