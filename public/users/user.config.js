(function() {
  'use strict';
  angular
  .module('user')
  .config(config);

  function config ($stateProvider){

    $stateProvider
      .state('myProfile', {
        url: '/myProfile',
        templateUrl: 'users/views/user.html',
        controller: 'UserController as vm'

      })
  }
})();
