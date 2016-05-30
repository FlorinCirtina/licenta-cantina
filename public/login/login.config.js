(function() {
  'use strict';

  angular
  .module('login')
  .config(config);

  function config ($stateProvider){

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/views/login.html',
        controller: 'LoginController as vm'

      })
      .state('register', {
        url: '/register',
        templateUrl: 'login/views/register.html',
        controller: 'RegisterController as vm'

      })
  }
})();
