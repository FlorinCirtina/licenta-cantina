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
    vm.categories = [{a:1}, {a: 2}, {a:3}];

    vm.product = {}
    vm.selectedCategory = vm.categories[0];
    vm.addCategory = function() {
      console.log(vm.category);
      var url = '/api/category';
      Util.create(url, vm.category)
        .then(function success(result) {
          console.log('result', result);
        }, function error(err) {
          console.log('err', err);
        })
        
    }

    vm.addProduct = function() {
      var url = '/api/product';
      vm.product.categoryId = vm.selectedCategory.a;
      Util.create(url, vm.product)
        .then(function success(result) {
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
