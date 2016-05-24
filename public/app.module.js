(function() {
  'use strict';

  /**
  * @ngdoc overview
  * @name siit
  * @description
  * # siit
  *
  * Main module of the application.
  */
  angular
  .module('cantina',
      [
        'ui.router',
        'test'
        // 'ngRoute'
      ]);


  // bootstrap application only when we have the necessary data
  // fetchData().then(bootstrapApplication);

  /**
   *  Get initial data from the server, like currently authenticated user
   *
   *  @return {Promise} $http
   */
  // function fetchData() {
  //     var initInjector = angular.injector(["ng"]);
  //     var $http = initInjector.get("$http");
  //     var $window = initInjector.get('$window');

  //     return $http
  //     .get('/auth/info')
  //     .then(function(response) {
  //       var result = response.data;
  //       $window.sessionStorage.user = JSON.stringify(result.data);
  //       $window.sessionStorage.token = result.data.token;
  //       $window.sessionStorage.permissions = JSON.stringify(result.data.permissions);

  //       return result.data;
  //     });
  // }

  // function bootstrapApplication() {
  //     angular.element(document).ready(function() {
  //         angular.bootstrap(document, ['siit']);
  //     });
  // }
})();
