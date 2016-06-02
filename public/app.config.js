(function() {
  'use strict';

  angular
  .module('cantina')
  .config(config)
  // .directive('onFinishRender', function ($timeout) {
  //   return {
  //     restrict: 'A',
  //     link: function (scope, element, attr) {
  //       if (scope.$last === true) {
  //         $timeout(function () {
  //           scope.$emit(attr.onFinishRender);
  //         });
  //       }
  //     }
  //   };
  // });

  function config($urlRouterProvider, $stateProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController as vm'

      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterController as vm'

      })
      .state('myProfile', {
        url: '/myProfile',
        templateUrl: 'templates/user.html',
        controller: 'UserController as vm'

      })
    $urlRouterProvider.otherwise("/login");
  }

})();
