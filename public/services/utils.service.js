(function() {
  'use strict';

  angular
  .module('cantina')
  .factory('Util', Util);

  Util.$inject = ['$http'];

  function Util($http) {
    var factory = {};

    factory.create = function(url, data) {
      var action = $http.post(url, data);
      return action;
    };

    factory.update = function(url, data) {
      var action = $http.put(url, data);
      return action;
    };

    factory.get = function(url) {
      var action = $http.get(url);
      return action;
    }

    factory.delete = function(url) {
      var action = $http.delete(url);
      return action;
    }
    
    return factory;
  }
})();
