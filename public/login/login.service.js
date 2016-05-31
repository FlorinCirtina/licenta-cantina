(function() {
  'use strict';

  angular
  .module('login')
  .factory('Login', Login);

  Login.$inject = ['$http', '$window'];

  function Login($http, $window) {
    var factory = {};

    factory.create = function(url, user) {
      var action = $http.post(url, user);
      return action;
    };

    factory.setUser = function(user) {
      $window.sessionStorage.user = JSON.stringify(user);
    }

    factory.getLoggedUser = function() {
      return JSON.parse($window.sessionStorage.user || null);
    }

    return factory;
  }
})();
