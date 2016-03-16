angular.module('app.services', [])

.factory('Authentication', ['$state', '$location', '$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', function($state, $location, $rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser) {
        if (authUser) {
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
            //$rootScope.currentUser = {firstname: 'qinCool'};
        }
    });
    
    return {
        // Because I input user into functions so $scope no longer needed:
        login: function(user) {
            console.log("user");
            auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(regUser) {
                console.log(user.email + " has been logged in.");
                $state.go('tabsController.success');
            }).catch(function(error) {
                console.log(error.message);
                $rootScope.message = error.message;
            });
        },

        register: function(user) {
            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(regUser) {
                
                // Edit here to modify user info that is to be loaded:
                var regRef = new Firebase(FIREBASE_URL + 'users').child(regUser.uid).set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email:  user.email,
                });
                
                $rootScope.message = "Hi " + user.firstname + ", Thanks for registering";
            }).catch(function(error) {
                $rootScope.message = error.message;
            });
        },
        
        logout: function() {
            return auth.$unauth();
        }

    };
}])

.service('BlankService', [function(){

}]);

