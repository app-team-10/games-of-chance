angular.module('publicpool', ['app.services'])

.controller('publicGoodsCtrl', function($scope, PublicpoolCheck) {
      
    $scope.poolname = {};
    /* 
    Note that ng-model can be used directly to create a string like poolname, so no need of making it an object.
    However, after adding 'ion-view'and 'ion-content' it has to be a key in an object to work.
    Well maybe not the only way but this is my approach.
    */

    $scope.addPool = function() {
        PublicpoolCheck.addPool($scope.poolname);
        $scope.poolname = {};
    };

    $scope.deletePool = function(key) {
        PublicpoolCheck.deletePool(key);
    }; 
})