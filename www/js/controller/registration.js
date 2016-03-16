angular.module('registration', ['app.services'])

.controller('signupCtrl', function($scope, Authentication) {
    /*
    $scope.message = "All fields required:";
    */
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
})