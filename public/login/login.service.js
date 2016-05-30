(function() {
  'use strict';

  angular
  .module('login')
  .factory('Login', Login);

  Login.$inject = ['$http'];

  function Login($http) {
    var factory = {};


    factory.create = function(url, user) {
      var action = $http.post(url, user);

      return action;
    };
    return factory;
  }
})();
