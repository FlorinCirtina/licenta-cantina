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
    initialize();
    initializeCategories()
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
          console.log(result.data);
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
          price: data.price
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

    vm.gotoAnchor = function(id) {
      console.log(id);
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(id);

      // call $anchorScroll()
      $anchorScroll();
    }
  }
})();
