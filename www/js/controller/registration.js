angular.module('registration', ['app.services'])

.controller('signupCtrl', ['$scope', 'Authentication', function($scope, Authentication) {

    $scope.user = {};
    
    $scope.login = function() {
        Authentication.login($scope.user);
        console.log("registration.js has called services.js");
    }; //login

    $scope.register = function() {
        Authentication.register($scope.user);
        console.log("registration.js has called services.js");
    }; // register
    
    $scope.logout = function() {
        Authentication.logout();
    }; //logout
}])