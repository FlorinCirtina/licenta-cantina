(function() {
  'use strict';

  angular
  .module('user')
  .factory('User', User);

  User.$inject = ['$http'];

  function User($http) {
    var factory = {};


    factory.get = function(url) {
      var action = $http.get(url);
      return action;
    }

    factory.update = function(url, user) {
      var action = $http.put(url, user);
      return action;
    }

    return factory;
  }
})();
