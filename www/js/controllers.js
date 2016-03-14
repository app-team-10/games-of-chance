angular.module('app.controllers', [])
  
.controller('uCLGambleCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('settingCtrl', function($scope) {

})
      
.controller('signupCtrl', function($scope, $firebaseAuth, FIREBASE_URL) {
    $scope.message = "nothing!!";
    $scope.user = {};
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    $scope.login = function() {
      $scope.message = "Welcome " + $scope.user.email;
    };

    $scope.register = function() {
        auth.$createUser({
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function(regUser) {
            $scope.message = "Hi " + $scope.user.firstname + ", Thanks for registering";
        }).catch(function(error) {
            $scope.message = error.message;
        });
    };
})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('trustGameCtrl', function($scope) {

})
   
.controller('publicGoodsCtrl', function($scope) {

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
 