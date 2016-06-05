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

    factory.get = function(url) {
      var action = $http.get(url);
      return action;
    }
    
    return factory;
  }
})();
