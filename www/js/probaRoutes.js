angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('probability', {
    url: '/page1',
    templateUrl: 'templates/probability.html',
    controller: 'probabilityCtrl'
  })

  .state('letSPlay', {
    url: '/page2',
    templateUrl: 'templates/letSPlay.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay2', {
    url: '/page3',
    templateUrl: 'templates/letSPlay2.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay3', {
    url: '/page4',
    templateUrl: 'templates/letSPlay3.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay4', {
    url: '/page5',
    templateUrl: 'templates/letSPlay4.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay5', {
    url: '/page6',
    templateUrl: 'templates/letSPlay5.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay6', {
    url: '/page7',
    templateUrl: 'templates/letSPlay6.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay7', {
    url: '/page8',
    templateUrl: 'templates/letSPlay7.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay8', {
    url: '/page9',
    templateUrl: 'templates/letSPlay8.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay9', {
    url: '/page10',
    templateUrl: 'templates/letSPlay9.html',
    controller: 'letSPlayCtrl'
  })

  .state('letSPlay10', {
    url: '/page13',
    templateUrl: 'templates/letSPlay10.html',
    controller: 'letSPlayCtrl'
  })

  .state('end', {
    url: '/page12',
    templateUrl: 'templates/end.html',
    controller: 'endCtrl'
  })

$urlRouterProvider.otherwise('/page1')



});
