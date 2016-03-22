angular.module('app.controllers', ['registration', 'app.services', 'publicpool', 'publicpoolCheck'])
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

.controller('selectionCtrl', ['$scope', '$rootScope', '$ionicPopup', 'Authentication', 'PublicpoolCheck', function($scope, $rootScope, $ionicPopup, Authentication, PublicpoolCheck) {
// If no Authentication factory, the $rootScope.currentUser will be undefined: start the app as logged in, directly jump to Selection Tab then error, undefined.
// The loading of currentUser's pool is done at loading login.html!

    $scope.estimateTime = function() {
        var timeArray = [5010, 5090, 5140, 5210, 5290, 5340, 5410, 5510, 5590, 5640, 5710, 5790, 5840, 5910, 5990, 6040, 6110, 6190, 6240, 6310, 6390, 6440, 6510, 6590, 6640, 6710, 6790, 6840, 6910, 6990, 7040, 7110, 7190, 7240, 7310, 7390, 7440, 7510, 7590, 7640, 7710, 7790, 7840, 7910, 7990];
        var myIndex = Math.floor(Math.random() * timeArray.length);
        var thisTime = timeArray[myIndex];
        $scope.thisTime = thisTime;

        var timeEstPopup = $ionicPopup.show({
            title: $scope.thisTime + 'ms',
            subTitle: 'Try to estimate the given time.',
            scope: $scope,
            buttons: [{ text: 'Quit' }, {
                text: '<b>Start</b>',
                type: 'button-positive',
                onTap: function(e) {
                    // e.preventDefault() will stop the popup from closing when tapped.
                    e.preventDefault();
                    $scope.startTime = new Date();
                }
            }, {
                text: '<b>Stop</b>',
                type: 'button-assertive',
                onTap: function(e) {
                    e.preventDefault();
                    $scope.endTime = new Date();
                    var difference = Math.abs(($scope.endTime - $scope.startTime) - $scope.thisTime);
                    console.log(difference);
                    if(difference <= 50) {
                        // addPoints(10);
                        console.log("10 Points added.");
                        $scope.timeMessage = "10 Points added.";
                    } else {
                        console.log("No Reward.");
                        $scope.timeMessage = "No Reward.";
                    }
                    $scope.showTimeMessage(difference);
                    timeEstPopup.close();
                }
            }]
        });
    }
    
    $scope.showTimeMessage = function(timeDif) {
        var alertPopup = $ionicPopup.alert({
            title: $scope.timeMessage,
            subTitle: "the time difference is: " + timeDif
        });
    };
}])
   
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
 