(function() {
  'use strict';

  angular
  .module('test')
  .config(config);

  function config ($stateProvider){

    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'test/views/test.html',
        controller: 'TestController as vm'

      })
  }
})();
