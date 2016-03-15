angular.module('registration', ['app.services'])

.controller('signupCtrl', function($scope, Authentication) {
    /*
    $scope.message = "All fields required:";
    */
    $scope.user = {};
    
    $scope.login = function() {
    Authentication.login($scope.user);
    }; //login

    $scope.register = function() {
    Authentication.register($scope.user);
    }; // register
})