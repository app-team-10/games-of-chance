angular.module('app.controllers', ['probability', 'registration', 'publicpool', 'publicpoolMembers', 'selection'])
// Just found out the order of dependency matters: app.service before registration will cause currentUser undefined.

/**
 * Very important: the dependencies and injections are in the same order!!
 * Or it will say some $ is NOT a function.
 */

//  <!-- If add any controller in HTML, the $scope within that element is tricky. -->

.controller('successCtrl', ['$scope', '$rootScope', '$location', '$state', '$ionicHistory', '$timeout', function($scope, $rootScope, $location, $state, $ionicHistory, $timeout) {
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
        
        // var tabsController = $scope.tabsController;
        // tabsController.select(4); 
        
        // The isRightAfterLogin is used to prompt user to donate.
        $rootScope.isRightAfterLogin = true;
        
        /*
        $location.path('/page1/tab1/page3');
        this is not a function ?? in ionic maybe.
        */
    }, 500);
}])
  
.controller('uCLGambleCtrl', function($scope) {

})
   
.controller('settingCtrl', function($scope) {

})
   
.controller('trustGameCtrl', function($scope) {

})
   
.controller('ultimatumGameCtrl', function($scope) {

})
   
.controller('beautyContestGameCtrl', function($scope) {

})
   
.controller('timeEstimationGameCtrl', function($scope) {

})
   
.controller('rockGuessingGameCtrl', function($scope) {

})
   
.controller('aboutUsCtrl', function($scope) {

})
 