angular.module('publicpoolCheck', [])

.factory('PublicpoolCheck', ['$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
        
    auth.$onAuth(function(authUser) {
      if (authUser) {
        var poolsRef = new Firebase(FIREBASE_URL + 'pools');
        poolsInfo = $firebaseArray(poolsRef);
        // Here poolsInfo is global because this service return an object where functions inside need poolsInfo.
        console.log("The poolsInfo is:");
        console.log(poolsInfo);
        $rootScope.pools = poolsInfo;
        
        poolsInfo.$loaded().then(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        }); //Make sure pool data is loaded

        poolsInfo.$watch(function(data) {
            $rootScope.howManyPools = poolsInfo.length;
            console.log($rootScope.howManyPools);
        });
      }
    });
    
    var returnObj = {
        addPool : function(poolname) {
            console.log(poolname.name);
            poolsInfo.$add({
                name: poolname.name,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                poolname={};
                returnObj.joinPool(id, true);
                console.log(ref);
                console.log(id);
            }); // Note: Because 'then' gives the id stright away, the joinPool needs to change correspondingly.
        },
        
        deletePool : function(key) {
            poolsInfo.$remove(key);
        },
                  
        joinPool : function(key, isOwner) {
            if(isOwner === true) {
                var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + key + '/poolees');
            } else {
                var id = poolsInfo.$keyAt(key);
                console.log("Pool's id is: " + id);
                var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + id + '/poolees');
            }
            var poolees = $firebaseArray(pooleesRef);
            
            // MUST have $loaded or the LENGTH of array is 0.
            poolees.$loaded().then(function() {                
                if(poolees.length >= 5) {
                    $rootScope.poolmessage = "This pool is full";
                    console.log($rootScope.poolmessage);
                } else {
                    var i = 0;
                    for(i = 0; i < poolees.length; i++) {
                        console.log(poolees.$getRecord(poolees.$keyAt(i)));
                        var aPoolee = poolees.$getRecord(poolees.$keyAt(i));
                        console.log(aPoolee.poolee);

                        if(aPoolee.poolee == $rootScope.currentUser.regUser) {
                            $rootScope.poolmessage = "You have already been inside.";
                            console.log($rootScope.poolmessage);
                            var inPool = true;
                        } // Note: inPool value is either true or undefined.
                    } 
                    if(inPool !== true) {
                        console.log("Becoming a poolee.");
                        // console.log(poolees);
                        poolees.$add({
                            poolee : $rootScope.currentUser.regUser
                        }).then(console.log("Is a poolee."));
                    }
                }
            });
            
            if(isOwner === true) {
                var poolownerRef = new Firebase(FIREBASE_URL + 'pools/' + key + '/poolowner');
                var poolowner = $firebaseArray(poolownerRef);
                
                console.log("Becoming the owner.");
                
                poolowner.$add({
                    owner : $rootScope.currentUser.regUser
                });
            } else {
                console.log("Wont become the owner.");
            }
        },
        
        quitPool : function(key) {
            var id = poolsInfo.$keyAt(key);
            console.log("Pool's id is: " + id);
            var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + id + '/poolees');
            var poolees = $firebaseArray(pooleesRef);
            
            poolees.$loaded().then(function() {                
                var i = 0;
                for(i = 0; i < poolees.length; i++) {
                    console.log(poolees.$getRecord(poolees.$keyAt(i)));
                    var aPoolee = poolees.$getRecord(poolees.$keyAt(i));
                    console.log(aPoolee.poolee);

                    if(aPoolee.poolee == $rootScope.currentUser.regUser) {
                        $rootScope.poolmessage = "You was inside.";
                        console.log($rootScope.poolmessage);
                        poolees.$remove(aPoolee);
                    } 
                } 
            });
        }
    }
    
    return returnObj;
}])