(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('AdminEditProductController', AdminEditProductController);

  AdminEditProductController.$inject = ['Util', 'Login','$state', '$scope'];

  function AdminEditProductController(Util, Login, $state, $scope) {
    var vm = this;
    vm.user = Login.getLoggedUser();
    vm.product = {}
    var entityId;

    if($state.params) {
      entityId = $state.params.id;
    }

    initializeProduct();
    
    function initializeProduct() {
      var url = '/api/product/'+ entityId;
      Util.get(url)
        .then(function success(result) {
          vm.product = result.data;
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.editProduct = function(productId) {
      var url = '/api/product/' + productId;
      Util.update(url, vm.product)
        .then(function success(result) {
          // vm.product = {};
        }, function error(err) {
          console.log('err', err);
        });
    }
    
    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
