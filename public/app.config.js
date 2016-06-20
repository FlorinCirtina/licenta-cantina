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
      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'templates/changePassword.html',
        controller: 'UserController as vm'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeController as vm'
      }) 
      .state('meniu', {
        url: '/meniu',
        templateUrl: 'templates/meniu.html',
        controller: 'MeniuController as vm'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'templates/admin.html',
        controller: 'AdminController as vm'
      })
      .state('order', {
        url: '/orders',
        templateUrl: 'templates/orders.html',
        controller: 'OrderController as vm'
      })
      .state('category', {
        url: '/category/:id',
        templateUrl: 'templates/edit.category.html',
        controller: 'AdminEditCategoryController as vm'
      })
      .state('product', {
        url: '/product/:id',
        templateUrl: 'templates/edit.product.html',
        controller: 'AdminEditProductController as vm'
      })
       .state('myOrders', {
        url: '/myOrders',
        templateUrl: 'templates/orders.html',
        controller: 'OrderController as vm'
      })
    $urlRouterProvider.otherwise("/login");
  }

})();
