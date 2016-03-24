angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

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
  
  .state('tabsController.publicGoods', {
    url: '/publicGoods',
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
  
  .state('tabsController.probability', {
    url: '/probability',
    views: {
      'tab2': {
        templateUrl: 'templates/games_intro/probability.html',
        // controller: 'probabilityCtrl'
      }
    }
  })
  
  .state('tabsController.probabilityGame', {
    url: '/probabilityGame',
    views: {
      'tab2': {
        templateUrl: 'templates/games/probabilityGame.html',
        controller: 'probabilityGameCtrl',
        resolve: {
            currentAuth: function(Authentication) {
                return Authentication.requireAuth();
            }
        }
      }
    }
  })
  
  .state('tabsController.timeEstimation', {
    url: '/timeEstimation',
    views: {
      'tab2': {
        templateUrl: 'templates/games_intro/timeEstimation.html',
        //controller: 'timeEstimationCtrl'
      }
    }
  })
  
  .state('tabsController.timeEstimationGame', {
    url: '/timeEstimationGame',
    views: {
      'tab2': {
        templateUrl: 'templates/games/timeEstimationGame.html',
        controller: 'timeEstimationGameCtrl',
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

  .state('tabsController.ultimatumGame', {
    url: '/page9',
    views: {
      'tab2': {
        templateUrl: 'templates/ultimatumGame.html',
        controller: 'ultimatumGameCtrl'
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