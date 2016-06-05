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
          console.log('get result', result);
          vm.categories = result.data
          vm.selectedCategory = vm.categories[0];
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.addCategory = function() {
      console.log(vm.category);
      var url = '/api/category';
      Util.create(url, vm.category)
        .then(function success(result) {
          vm.category = {};
          console.log('result', result);
        }, function error(err) {
          console.log('err', err);
        });
    }

    vm.addProduct = function() {
      var url = '/api/product';
      console.log(vm.selectedCategory);
      vm.product.category = vm.selectedCategory._id;
      console.log('vm.product', vm.product);
      Util.create(url, vm.product)
        .then(function success(result) {
          vm.product = {};
          console.log('result', result);
        }, function error(err) {
          console.log('err', err);
        });
    }
    
    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
