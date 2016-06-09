(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('OrderController', OrderController);

  OrderController.$inject = ['Util','Login','$state', '$scope'];

  function OrderController(Util, Login, $state, $scope) {
    var vm = this;
    vm.user = Login.getLoggedUser();
    vm.orders = [];
    var urlOrder = '/api/orders';
    
    if($state.current.name == 'myOrders') {
      urlOrder = urlOrder + '?myOrders=true'
    }
    initialize();

    function initialize() {
      Util.get(urlOrder)
        .then(function success(result) {
          vm.orders = result.data;
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
