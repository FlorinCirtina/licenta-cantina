(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('MeniuController', MeniuController);

  MeniuController.$inject = ['Util', '$state', '$scope', '$filter'];

  function MeniuController(Util, $state, $scope,$filter) {
    var vm = this;
    vm.products = [];
    initialize();

    function initialize() {
      var url = '/api/products';
      Util.get(url)
        .then(function success(result) {
          sortProductsByCategories(result.data);
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
  }
})();
