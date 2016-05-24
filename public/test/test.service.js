(function() {
  'use strict';

  angular
  .module('test')
  .factory('Test', Test);

  Test.$inject = ['$http'];

  function Test($http) {
    var factory = {};
    var serviceBase = '/api/clients';

    /**
     * Create a new test
     *
     * @param {Object} test
     * @return {Promise} action
     */
    factory.create = function(test) {
      var action = $http.post(serviceBase, test);

      return action;
    };

    factory.serviceTest = function() {
      console.log('from service test');
    }

    return factory;
  }
})();
