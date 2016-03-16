angular.module('app.directives', [])

.directive('authInfo', [function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/authInfo.html'
    };
}]);

