angular.module('publicpool', ['app.services'])

.controller('publicGoodsCtrl', ['$scope', '$rootScope', '$ionicPopup', 'PublicpoolCheck', function($scope, $rootScope, $ionicPopup, PublicpoolCheck) {
      
    $scope.poolProp = {};
    /**
     * Note that ng-model can be used directly to create a string like poolname, so no need of making it an object.
     * However, after adding 'ion-view'and 'ion-content' it has to be a key in an object to work.
     * Well maybe not the only way but this is my approach.
    */

    $scope.addPool = function() {
        PublicpoolCheck.addPool($scope.poolProp);
        $scope.poolProp = {};
    };

    $scope.deletePool = function(key) {
        PublicpoolCheck.deletePool(key);
    }; 
    
    $scope.joinPool = function (key) {
        $scope.data = {};
        $scope.data.key = key;

        var fundPopup = $ionicPopup.show({
            template: '<input type="number" ng-model="data.fund">',
            title: 'Enter Your Investment',
            subTitle: 'Please enter a positive integer',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {   
                    text: '<b>Join</b>',
                    type: 'button-calm',
                    onTap: function(e) {
                        if (!$scope.data.fund) {
                            //don't allow the user to close unless he enters fund.
                            e.preventDefault();
                        } else {
                            return $scope.data.fund;
                        }
                    }
                }
            ]
        });

        fundPopup.then(function(res) {
            console.log('Tapped!', res);
            PublicpoolCheck.joinPool($scope.data.key, $scope.data.fund, false);
        });
    };
    
    $scope.quitPool = function (key) {
        PublicpoolCheck.quitPool(key);
    };
    
    $scope.testIndex = function (params) {
        PublicpoolCheck.testIndex(params);
    };
    
    $scope.showPool = function (key) {
        PublicpoolCheck.showPool(key);
    };
    /**
     * After testing with following code : click icon button on a item button will trigger both.
     */
    // $scope.testItemLink = function () {
    //     console.log("Click icon buttons will trigger the item button.");
    // }Í
    // $scope.showPool = function (thig) {
    //     console.log("Click icon buttons will NOT trigger the item button.");
    // }
    
    $scope.punish = function (key) {
        if ($rootScope.currentUser.points > 0) {
            PublicpoolCheck.punish(key);
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'No Enough Points!',
                template: 'Go top-up or play some free games to gain points.'
            });
        }
    };
    
    $scope.confirm = function () {
        PublicpoolCheck.confirm();
    }
}])