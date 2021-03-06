angular.module('probability', ['app.services'])

.controller('probabilityGameCtrl', ['$scope', '$rootScope', '$ionicPopup', '$ionicHistory', 'FIREBASE_URL',function($scope, $rootScope, $ionicPopup, $ionicHistory, FIREBASE_URL) {
    console.log("probabilityGameCtrl is working.");
    $scope.probability = {};
    
    $ionicHistory.nextViewOptions({
        disableBack: true
    });
    
    $scope.generatePercentage = function () {
        return 5 * (Math.floor(Math.random() * 19) + 1);
    };
    $scope.generatePoints = function () {
        return 10 * (Math.floor(Math.random() * 10) + 1);
    };
    
    // This function is given a percentage and according to that randomly determine if winning.
    $scope.randomWithProbability = function (a) {
        // 'a' param is the winning perventage.        
        var notRandomNumbers = [];
        var l=100-a;
        for(var i=0;i<a;i++) {
            notRandomNumbers.push(1);
        }
        for(var i=0;i<l;i++) {
            notRandomNumbers.push(0);
        }

        var idx = Math.floor(Math.random() * notRandomNumbers.length);
        return notRandomNumbers[idx];
        // returning 1 or 0.
    };
    
    $scope.counter = 10;
    $scope.probability.chancew = $scope.generatePercentage();
    $scope.probability.chancel = 100 - $scope.probability.chancew;
    console.log($scope.probability.chancew);
    $scope.probability.amount = $scope.generatePoints();
    console.log($scope.probability.amount);
    $scope.initialPoints = -50;
    
    $scope.check = function () {
        console.log("check() is called.");
        var ifItsWinning = $scope.randomWithProbability($scope.probability.chancew);
        if (ifItsWinning == 1) {
            $scope.initialPoints += $scope.probability.amount;
            var alertPopup = $ionicPopup.alert({
                title: 'Won',
                template: "you won " + $scope.probability.amount + " points"
            });
        } else if (ifItsWinning == 0) {
            $scope.initialPoints -= $scope.probability.amount;
            var alertPopup = $ionicPopup.alert({
                title: 'Lost',
                template: "you lost " + $scope.probability.amount + " points"
            });
        }
        $scope.reset();
    };
    
    $scope.plus=function(){
        $scope.initialPoints += 1;
        $scope.reset();
    };
    
    $scope.reset = function () {
        $scope.probability.amount = $scope.generatePoints();
        $scope.probability.chancew = $scope.generatePercentage();
        $scope.probability.chancel = 100 - $scope.probability.chancew;
        $scope.counter = $scope.counter - 1;
        if($scope.counter == 0) {
            $scope.addPoints($scope.initialPoints);
            var finishPopup = $ionicPopup.alert({
                title: "Finished!",
                subTitle: "Your won" + $scope.initialPoints + " points."
            });
            $scope.initialPoints = -50;
            $scope.counter = 10;
            $ionicHistory.goBack();
        }
    };
    
    $scope.addPoints = function(x) {
        var Ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser).update({
            points : $rootScope.currentUser.points + x
        });
    };
    
    $scope.probalilityQuit = function () {
        console.log("probabilityQuit is called");
        console.log($scope.counter + " counter value.");
        if($scope.counter != 10) {
            console.log("$scope.counter is not 10.");
            var haveToFinishPopup = $ionicPopup.alert({
                title: "Please Continue!",
                subTitle: "You have already started this game."
            });
        } else {
            $ionicHistory.goBack();
        }
    };
}])