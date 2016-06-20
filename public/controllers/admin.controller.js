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
    vm.products= [];
    initializeCategories();
    initializeProducts();

    function initializeProducts() {
      var url = '/api/products';
      Util.get(url)
        .then(function success(result) {
          vm.products = result.data
        }, function error(err) {
          console.log('err', err);
        })
    }

    function initializeCategories() {
      var url = '/api/categories';
      Util.get(url)
        .then(function success(result) {
          vm.categories = result.data
          vm.selectedCategory = vm.categories[0];
          vm.editCategory = angular.copy(vm.categories);
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.deleteCategory = function(id) {
      var url = '/api/category/' + id;
      Util.delete(url)
        .then(function success(result) {
          initializeCategories()
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.deleteProduct = function(id) {
      var url = '/api/product/' + id;
      Util.delete(url)
        .then(function success(result) {
          initializeProducts()
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.addCategory = function() {
      var url = '/api/category';
      Util.create(url, vm.category)
        .then(function success(result) {
          vm.category = {};
          initializeCategories();
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
          initializeProducts();
        }, function error(err) {
          console.log('err', err);
        });
    }
    vm.navigateTo = function(state, id) {
      console.log(id);
       if(id) {
        $state.go(state,{id: id});
       } else {
        $state.go(state);
       }
    };
  }
})();
