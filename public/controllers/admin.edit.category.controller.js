(function () {
  'use strict';

  angular
  .module('cantina')
  .controller('AdminEditCategoryController', AdminEditCategoryController);

  AdminEditCategoryController.$inject = ['Util', 'Login','$state', '$scope'];

  function AdminEditCategoryController(Util, Login, $state, $scope) {
    var vm = this;
    vm.user = Login.getLoggedUser();
    vm.category = {}
    vm.product = {}
    var entityId;

    if($state.params) {
      entityId = $state.params.id;
    }

    initializeCategory();
    
    function initializeCategory() {
      var url = '/api/category/'+ entityId;
      Util.get(url)
        .then(function success(result) {
          vm.category = result.data;
        }, function error(err) {
          console.log('err', err);
        })
    }

    vm.editCategory = function(categoryId) {
      var url = '/api/category/' + categoryId;
      Util.update(url, vm.category)
        .then(function success(result) {
        }, function error(err) {
          console.log('err', err);
        });
    }
    
    vm.navigateTo = function(state) {
      $state.go(state);
    };
  }
})();
