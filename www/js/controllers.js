angular.module('app.controllers', ['registration', 'app.services', 'publicpool', 'publicpoolCheck', 'selection'])
// Just found out the order of dependency matters: app.service before registration will cause currentUser undefined.

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
 