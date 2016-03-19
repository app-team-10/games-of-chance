angular.module('publicpoolCheck', [])

.factory('PublicpoolCheck', ['$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
        
    auth.$onAuth(function(authUser) {
      if (authUser) {
        var poolsRef = new Firebase(FIREBASE_URL + 'pools');
        poolsInfo = $firebaseArray(poolsRef);
        console.log("The poolsInfo is:");
        console.log(poolsInfo);
        // Here poolsInfo is global because this service return an object where functions inside need poolsInfo.
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
            //var poolsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pools');
            //var poolsInfo = $firebaseArray(poolsRef);
            console.log(poolname.name);
            poolsInfo.$add({
                name: poolname.name,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                poolname={};
                returnObj.joinPoolAsOwner(id, true);
                console.log(ref);
                console.log(id);
            }); //promise
        },
        
        deletePool : function(key) {
            //var poolsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/pools');
            //var poolsInfo = $firebaseArray(poolsRef);
            poolsInfo.$remove(key);
        },
                  
        joinPool : function(key, boolll) {
            var id = poolsInfo.$keyAt(key);
            // Finally after a whole day I figured out this is how to invoke the id...
            console.log(id);
            // returnObj.joinPoolAsOwner(id, false);
            var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + id + '/poolees');
            var poolees = $firebaseArray(pooleesRef);
            
            // MUST have $loaded or the LENGTH of array is 0.
            poolees.$loaded().then(function() {
                //console.log(poolees.isArray()); NOT A FUNCTION
                
                poolees.$getRecord();
                /** Following code for testing $loaded */
                // var i = 0;
                // var inPoolBool;
                // console.log("i starts at value:" + i);
                // console.log("poolees has length:" + poolees.length);
                // for(i = 0; i < poolees.length; i++) {
                //     console.log("Printing for loop:");
                //     console.log(poolees.$keyAt(i));
                // }
                // for(thing in poolees){
                //     console.log("Printing in loop" + thing);                
                // }
                var i = 0;
                for(i = 0; i < poolees.length; i++) {
                    console.log(poolees.$getRecord(poolees.$keyAt(i)));
                    var aPoolee = poolees.$getRecord(poolees.$keyAt(i));
                    console.log(aPoolee.poolee);
                    //
                    // Finally I succeeded at this step....19Mar2016 21:53
                    //
                    
                }
            });
        },
                  
        joinPoolAsOwner : function(key, isInitiator) {
            var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + key + '/poolees');
            var poolees = $firebaseArray(pooleesRef);
            // Global because of inPool() function.
            
            console.log("The joinPool service is called. The poolees array is:");
            console.log(poolees);
            
            // var inPool;
            var inPoolBool = [];
            angular.forEach(poolees, function(poolee){
                console.log("poolee in poolees is:");
                console.log(poolee);
                if(poolee == {poolee : $rootScope.currentUser.regUser}) {
                    console.log("Already in this pool.");                        
                    this.push({inPool : true});
                } else { 
                    console.log("Not yet in this pool.");                        
                    this.push({inPool : false});
                }
            }, inPoolBool);
            console.log(inPoolBool);
            
            /** Following code for trying to figure out how can I check if the user is already in that pool: 
             * 
            angular.forEach(poolees, function(poolee){
                if(thing == {poolee : $rootScope.currentUser.regUser}) {
                    console.log("Already in this pool.");                        
                    inPool = true;
                } else { 
                    console.log("Not yet in this pool.");                        
                    inPool = false;
                }
            });
            
            function inPool(poolees) {
                for(poolee in poolees) {
                    console.log(poolee);
                    if(poolee == {poolee : $rootScope.currentUser.regUser}) {
                        console.log("Already in this pool.");                        
                        return true;
                    } else { 
                        console.log("Not yet in this pool.");                        
                        return false;
                    }
                }
                var i = 0;
                for(i = 0; i < poolees.length; i++) {
                    console.log(poolees[i]);
                    if(poolee[i] == {poolee : $rootScope.currentUser.regUser}) {
                        console.log("Already in this pool.");                        
                        return true;
                    } else { 
                        console.log("Not yet in this pool.");                        
                        return false;
                    }
                }
            } 
            
            console.log(inPool);            
            */
            if(poolees.length >= 5) {
                $rootScope.poolmessage = "This pool is full";
                console.log($rootScope.poolmessage);
            } else if(inPoolBool.pop() == {inPool : true}) {
                $rootScope.poolmessage = "You are inside already";
                console.log($rootScope.poolmessage);
            } else {
                console.log("Becoming a poolee.");
                console.log(poolees);
                poolees.$add({
                    poolee : $rootScope.currentUser.regUser
                }).then(console.log("Is a poolee."));
            }
            
            if(isInitiator == true) {
                var poolownerRef = new Firebase(FIREBASE_URL + 'pools/' + key + '/poolowner');
                var poolowner = $firebaseArray(poolownerRef);
                
                console.log("Becoming the owner.");
                
                poolowner.$add({
                    owner : $rootScope.currentUser.regUser
                });
            } else {
                console.log("Wont become the owner.");
            }
        }
    }
    
    return returnObj;
}])