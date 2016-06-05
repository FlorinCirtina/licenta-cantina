(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('AdminController', AdminController);

  AdminController.$inject = ['Util', 'Login','$state', '$scope'];

  function AdminController(Util, Login, $state, $scope) {
    var vm = this;
    vm.user = Login.getLoggedUser();
    vm.category = {}
    vm.product = {}

    initialize();
    
    function initialize() {
      var url = '/api/categories';
      Util.get(url)
        .then(function success(result) {
          vm.categories = result.data
          vm.selectedCategory = vm.categories[0];
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.addCategory = function() {
      var url = '/api/category';
      Util.create(url, vm.category)
        .then(function success(result) {
          vm.category = {};
        }, function error(err) {
          console.log('err', err);
        });
    }

    vm.addProduct = function() {
      var url = '/api/product';
      vm.product.category = vm.selectedCategory._id;
      Util.create(url, vm.product)
        .then(function success(result) {
          vm.product = {};
        }, function error(err) {
          console.log('err', err);
        });
    }
    
    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
