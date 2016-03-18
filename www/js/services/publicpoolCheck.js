angular.module('publicpoolCheck', [])

.factory('PublicpoolCheck', ['$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
        
    auth.$onAuth(function(authUser) {
      if (authUser) {
        var poolsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pools');
        poolsInfo = $firebaseArray(poolsRef);
        // Here poolsInfo is global because this service return an object where functions inside need poolsInfo.
        $rootScope.pools = poolsInfo;
        
        poolsInfo.$loaded().then(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        }); //Make sure pool data is loaded

        poolsInfo.$watch(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        });
      }
    });
    
    return {
        addPool : function(poolname) {
          //var poolsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pools');
          //var poolsInfo = $firebaseArray(poolsRef);
          console.log(poolname.name);
          poolsInfo.$add({
            name: poolname.name,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            poolname={};
          }); //promise
        },
        
        deletePool : function(key) {
          //var poolsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pools');
          //var poolsInfo = $firebaseArray(poolsRef);
          poolsInfo.$remove(key);
        }
    }
}])