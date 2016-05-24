(function() {
  'use strict';

  angular
  .module('cantina')
  .config(config)
  // .run(run)
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
    // NotificationProvider.setOptions({
    //   delay: 5000,
    //   startTop: 50,
    //   startRight: 10,
    //   verticalSpacing: 20,
    //   horizontalSpacing: 20,
    //   positionX: 'right',
    //   positionY: 'top'
    // });

    $urlRouterProvider.otherwise("/dashboard");

    // $stateProvider.state('notFound', {
    //   templateUrl: 'app/common/views/page.not.found.html',
    //   resolve: {
    //     addClass: function() {
    //       angular.element("#main_container").addClass("page-404-3");
    //     }
    //   }
    // });

    // $stateProvider.state('forbidden', {
    //   templateUrl: 'app/common/views/page.forbidden.html',
    //   resolve: {
    //     addClass: function() {
    //       angular.element("#main_container").addClass("forbidden");
    //     }
    //   }
    // });

    // cfpLoadingBarProvider.parentSelector = '#main_container';
    // cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-spinner">' +
    //                                         '<div>' +
    //                                         '<i class="fa fa-refresh fa-spin"></i>' +
    //                                         '<p>Loading data...</p>' +
    //                                         '</div></div>';
  }

  // run.$inject = ['$rootScope', '$state', '$stateParams', 'Auth'];

  function run($rootScope, $state, $stateParams, Auth) {
    Auth.initialize();

    $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
      if ($state.current.name != 'notFound') {
        angular.element(".page-404-3").removeClass("page-404-3");
      }

      var policies = (to.data) ? to.data.policies : null;

      // if there is a single policy as string set for the desired state
      if ((typeof policies === 'string') && Auth.currentUser.permissions.indexOf(policies) === -1) {
        evt.preventDefault();
        $state.go('forbidden', params)
      }

      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)
      }
    });
  }

})();
