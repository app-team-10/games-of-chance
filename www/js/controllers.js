angular.module('app.controllers', ['registration', 'app.services'])

/**
 * Very important: the dependencies and injections are in the same order!!
 * Or it will say some $ is NOT a function.
 */
.controller('successCtrl', ['$scope', '$location', '$state', '$ionicHistory', '$timeout', function($scope, $location, $state, $ionicHistory, $timeout) {
    /* 
    In order to go back to profile but clear history:
    $ionicHistory.clearHistory();
    */
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        // this is better, i think, than clearhistory:
        historyRoot: true
        //disableBack: true
    });
    $timeout(function() {
        $state.go('tabsController.profile');
        /*
        $location.path('/page1/tab1/page3');
        this is not a function ?? in ionic maybe.
        */
    }, 2000);
}])
  
.controller('uCLGambleCtrl', function($scope) {

})
   
.controller('settingCtrl', function($scope) {

})
   
.controller('trustGameCtrl', function($scope) {

})
   
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
        }; // addMeeting

        $scope.deletePool = function(key) {
          poolsInfo.$remove(key);
        }; // deleteMeeting
      } // User Authenticated
    }); // on Auth
}]) //Controller
   
.controller('ultimatumGameCtrl', function($scope) {

})
   
.controller('probabilityGameCtrl', function($scope) {

})
   
.controller('beautyContestGameCtrl', function($scope) {

})
   
.controller('timeEstimationGameCtrl', function($scope) {

})
   
.controller('rockGuessingGameCtrl', function($scope) {

})
   
.controller('aboutUsCtrl', function($scope) {

})
 