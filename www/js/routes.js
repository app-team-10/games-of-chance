angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('tabsController.uCLGamble', {
    url: '/page2',
    views: {
      'tab2': {
        templateUrl: 'templates/uCLGamble.html',
        controller: 'uCLGambleCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.profile'
      2) Using $state.go programatically:
        $state.go('tabsController.profile');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page3
      /page1/tab3/page3
  */
  .state('tabsController.profile', {
    url: '/page3',
    views: {
      'tab1': {
        templateUrl: 'templates/profile.html',
        controller: 'signupCtrl'
      },
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'signupCtrl'
      }
    }
  })
  
  .state('tabsController.selection', {
    url: '/selection',
    views: {
      'tab4': {
        templateUrl: 'templates/selection.html',
        controller: 'selectionCtrl'
      }
    }
  })

  .state('tabsController.setting', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/setting.html',
        controller: 'settingCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.signup', {
    url: '/page5',
    views: {
      'tab1': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      },
      'tab3': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('tabsController.login', {
    url: '/page6',
    views: {
      'tab1': {
        templateUrl: 'templates/login.html',
        controller: 'signupCtrl'
      },
      'tab3': {
        templateUrl: 'templates/login.html',
        controller: 'signupCtrl'
      }
    }
  })
  
  .state('tabsController.success', {
    url: '/success',
    views: {
      'tab1': {
        templateUrl: 'templates/success.html',
        controller: 'successCtrl',
        resolve: {
            currentAuth: function(Authentication) {
                return Authentication.requireAuth();
            } 
        }
      },
      'tab3': {
        templateUrl: 'templates/success.html',
        controller: 'successCtrl',
        resolve: {
            currentAuth: function(Authentication) {
                return Authentication.requireAuth();
            } 
        }
      }
    }
  })

  .state('tabsController.trustGame', {
    url: '/page7',
    views: {
      'tab2': {
        templateUrl: 'templates/trustGame.html',
        controller: 'trustGameCtrl'
      }
    }
  })

  .state('tabsController.publicGoods', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/games_intro/publicGoods.html',
        //controller: 'publicGoodsCtrl'
      }
    }
  })
  
  .state('tabsController.publicGoodsGame', {
    url: '/publicGoodsGame',
    views: {
      'tab2': {
        templateUrl: 'templates/games/publicGoodsGame.html',
        controller: 'publicGoodsCtrl',
        resolve: {
            currentAuth: function(Authentication) {
                return Authentication.requireAuth();
            } //current Auth
        } //resolve
      }
    }
  })

  .state('tabsController.ultimatumGame', {
    url: '/page9',
    views: {
      'tab2': {
        templateUrl: 'templates/ultimatumGame.html',
        controller: 'ultimatumGameCtrl'
      }
    }
  })

  .state('tabsController.probabilityGame', {
    url: '/page10',
    views: {
      'tab2': {
        templateUrl: 'templates/probabilityGame.html',
        controller: 'probabilityGameCtrl'
      }
    }
  })

  .state('tabsController.beautyContestGame', {
    url: '/page11',
    views: {
      'tab2': {
        templateUrl: 'templates/beautyContestGame.html',
        controller: 'beautyContestGameCtrl'
      }
    }
  })

  .state('tabsController.timeEstimationGame', {
    url: '/page12',
    views: {
      'tab2': {
        templateUrl: 'templates/timeEstimationGame.html',
        controller: 'timeEstimationGameCtrl'
      }
    }
  })

  .state('tabsController.rockGuessingGame', {
    url: '/page13',
    views: {
      'tab2': {
        templateUrl: 'templates/rockGuessingGame.html',
        controller: 'rockGuessingGameCtrl'
      }
    }
  })

  .state('tabsController.aboutUs', {
    url: '/page14',
    views: {
      'tab3': {
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});