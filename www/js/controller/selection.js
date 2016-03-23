angular.module('selection', ['app.services'])

.controller('selectionCtrl', ['$scope', '$rootScope', '$ionicPopup', 'Authentication', 'PublicpoolCheck', 'FIREBASE_URL', function($scope, $rootScope, $ionicPopup, Authentication, PublicpoolCheck, FIREBASE_URL) {
// If no Authentication factory, the $rootScope.currentUser will be undefined: start the app as logged in, directly jump to Selection Tab then error, undefined.
// The loading of currentUser's pool is done at loading login.html!

    //-------------------------- TimeEstimation Popup --------------------------//

    $scope.estimateTime = function() {
        var timeArray = [5010, 5090, 5140, 5210, 5290, 5340, 5410, 5510, 5590, 5640, 5710, 5790, 5840, 5910, 5990, 6040, 6110, 6190, 6240, 6310, 6390, 6440, 6510, 6590, 6640, 6710, 6790, 6840, 6910, 6990, 7040, 7110, 7190, 7240, 7310, 7390, 7440, 7510, 7590, 7640, 7710, 7790, 7840, 7910, 7990];
        var myIndex = Math.floor(Math.random() * timeArray.length);
        var thisTime = timeArray[myIndex];
        $scope.thisTime = thisTime;
        console.log($scope.thisTime);

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
                        $scope.addPoints(10);
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
    };
    
    $scope.showTimeMessage = function(timeDif) {
        var alertPopup = $ionicPopup.alert({
            title: $scope.timeMessage,
            subTitle: "the time difference is: " + timeDif + " ms."
        });
    };
    
    $scope.addPoints = function(points) {
        var Ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser).update({
            points : ($rootScope.currentUser.points + points)
        });
    };
    
    //-------------------------- Charity Popup --------------------------//
    
    $scope.substractPoints = function(points) {
        var Ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser).update({
            points : ($rootScope.currentUser.points - points)
        });
    };
    
    $scope.charityPrompt = function (params) {
        $scope.charity = {}
        
        var charityPopup = $ionicPopup.show({
            title: "I Want to Donate!",
            subTitle: "We together make a better world.",
            template: '<input type="number" ng-model="charity.donation">',
            scope: $scope,
            buttons: [{ text: 'Next time' }, {
                text: '<b>Sure!</b>',
                type: 'button-positive',
                onTap: function(e) {
                    // e.preventDefault() will stop the popup from closing when tapped.
                    e.preventDefault();
                    $scope.donate($scope.charity.donation);
                    charityPopup.close();
                }
            }]
        });
    };
    
    $scope.donate = function (points) {
        $scope.substractPoints(points);
        var Ref = new Firebase(FIREBASE_URL + 'charity').push({
            points : points
        });
        console.log(points + " points donated.");
    }
}])