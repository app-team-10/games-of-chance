angular.module('publicpool', [])

.controller('publicGoodsCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
      
    $scope.poolname = {};
    /* 
    Note that ng-model can be used directly to create a string like poolname, so no need of making it an object.
    However, after adding 'ion-view'and 'ion-content' it has to be a key in an object to work.
    Well maybe not the only way but this is my approach.
    */

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
        
    auth.$onAuth(function(authUser) {
      if (authUser) {
        var poolsRef = new Firebase(FIREBASE_URL + 'users/' +
          $rootScope.currentUser.$id + '/pools');
        var poolsInfo = $firebaseArray(poolsRef);
        $scope.pools = poolsInfo;

        $scope.addPool = function() {
          console.log($scope.poolname.name);
          poolsInfo.$add({
            name: $scope.poolname.name,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.poolname={};
          }); //promise
        };
        
        poolsInfo.$loaded().then(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        }); //Make sure pool data is loaded

        poolsInfo.$watch(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        });

        $scope.deletePool = function(key) {
          poolsInfo.$remove(key);
        }; 
      }
    });
}])