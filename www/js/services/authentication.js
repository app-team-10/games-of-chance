angular.module('authentication', [])

.factory('Authentication', ['$state', '$location', '$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', function($state, $location, $rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser) {
        if (authUser) {
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
            $rootScope.message = "";
        } else {
            $rootScope.currentUser = '';
            $rootScope.message = "You are not logged in.";
            //$rootScope.currentUser = {firstname: 'qinCool'};
        }
    });
    
    var authObj = {
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
                
                // Log-in after registration!
                authObj.login(user);
                
                $rootScope.message = "Hi " + user.firstname + ", Thanks for registering";
            }).catch(function(error) {
                $rootScope.message = error.message;
            });
        },
        
        logout: function() {
            return auth.$unauth();
        },
        
        // For controlling authentication on success page:
        requireAuth: function() {
            return auth.$requireAuth();
        }

    };
    
    return authObj;
    
}])

.service('BlankService', [function(){

}]);