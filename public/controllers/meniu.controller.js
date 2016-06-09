(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('MeniuController', MeniuController);

  MeniuController.$inject = ['Util', '$state', '$scope', '$filter', '$location', '$anchorScroll'];

  function MeniuController(Util, $state, $scope,$filter, $location, $anchorScroll) {
    var vm = this;
    vm.products = [];
    vm.categories = [];
    vm.cart = [];
    var urlCart = '/api/cart';

    initialize();
    initializeCategories()
    initializeCart();

    function initializeCart() {
      Util.get(urlCart)
      .then(function success(result) {
        vm.cart = result.data.products;
        vm.totalCartValue = result.data.total;
        if(result.data.products && result.data.products.length) {
          vm.existCart = true;
        } else {
          vm.existCart = false;
        }
      }, function error(err) {
        console.log('err', err);
      })
    }
    
    function initialize() {
      var url = '/api/products';
      Util.get(url)
        .then(function success(result) {
          sortProductsByCategories(result.data);
        }, function error(err) {
          console.log('err', err);

        });
    }

    function initializeCategories() {
      var url = '/api/categories';
      Util.get(url)
        .then(function success(result) {
          vm.categories = result.data;
        }, function error(err) {
          console.log('err', err);

        });
    }

    function sortProductsByCategories(result) {
      var test = {};
      for(var i = 0 ; i < result.length; i++) {
        var data = result[i];
        var product = {
          name: data.name,
          price: data.price,
          _id: data._id
        };
        var categoryName = data.category.name;
        if(i == 0) {
          test[categoryName] = [];
          test[categoryName].push(product);
        } else {
          if(test[categoryName]) {
            test[categoryName].push(product);
          } else {
            test[categoryName] = [];
            test[categoryName].push(product)
          }
        }
      }
      vm.products = test;
    }

    vm.addToCart = function(product) {
      Util.create(urlCart, product)
        .then(function success(result) {
          initializeCart();
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.removeFromCart = function(product) {

      Util.update(urlCart, product)
        .then(function success(result) {
          initializeCart();
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.submitOrder = function() {
      Util.get(urlCart)
        .then(function success(result) {
          var data = result.data;
          var urlOrder = 'api/order';
          Util.create(urlOrder, data)
            .then(function success(orderResult) {
              vm.cart = [];
              vm.existCart = false;
              vm.totalCartValue = 0;
            }, function error(orderError) {
              console.log('orderError');
            });
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.gotoAnchor = function(id) {
      $location.hash(id);
      $anchorScroll();
    }
  }
})();
