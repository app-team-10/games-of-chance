angular.module('publicpoolCheck', [])

/**
 * On 23/Mar/2016:
 * Because of the index error caused by filter & ng-repeat, I changed the approach of finding pool in poolsInfo array. 
 * However, I did not change the parameter name that these functions take.
 * Beware a parameter named 'key' might actually be an object, if that function is called by ng-repeat with filter in HTML.
 */

.factory('PublicpoolCheck', ['$rootScope', '$state', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($rootScope, $state, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

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
            
            var i = 0, j = 0;
            for(i = 0; i < poolsInfo.length; i++) {
                // If the pool was created but no poolee..
                if(typeof poolsInfo[i].poolees !== "undefined") {
                    $rootScope.totalPoolFund = 0;
                    console.log(poolsInfo[i].poolees);
                    // To get size of object: 
                    console.log("Number of members: ");
                    console.log(Object.keys(poolsInfo[i].poolees).length);
                    if(Object.keys(poolsInfo[i].poolees).length == 5) {
                        for(var pooleetoadd in poolsInfo[i].poolees) {
                            console.log("There is a fund: ");
                            console.log(poolsInfo[i].poolees[pooleetoadd].fund)
                            $rootScope.totalPoolFund += poolsInfo[i].poolees[pooleetoadd].fund;
                        }
                        console.log("The total fund is: ");
                        console.log($rootScope.totalPoolFund);
                        console.log("The shared fund is: ");
                        console.log(Math.floor($rootScope.totalPoolFund / 5));
                        for(var pooleetoshare in poolsInfo[i].poolees) {
                            var pooleetoshareRef = new Firebase(FIREBASE_URL + 'pools/' + poolsInfo.$keyAt(i) + '/poolees').child(pooleetoshare).update({
                                reward : (Math.floor($rootScope.totalPoolFund / 5))
                            });
                        }
                        var pooleetosharepoolRef = new Firebase(FIREBASE_URL + 'pools/' + poolsInfo.$keyAt(i)).update({
                            reward : (Math.floor($rootScope.totalPoolFund / 5))
                        });
                    }
                }
            }
        });
        
        // For quiting: 
        var poolsRefUserRecord = new Firebase(FIREBASE_URL + 'users/' + authUser.uid + '/userPools');
        // Here if use $rootScope.currentUser.regUser instead of authUser.uid, 0 pool is shown.
        poolsInfoUserRecord = new $firebaseArray(poolsRefUserRecord);
        console.log("The poolsInfoUserRecord is:");
        console.log(poolsInfoUserRecord);
        $rootScope.poolsUserRecord = poolsInfoUserRecord;
        
        poolsInfoUserRecord.$loaded().then(function(data) {
            $rootScope.howManyPoolsUserHas = poolsInfoUserRecord.length;
            console.log($rootScope.howManyPoolsUserHas);
        }); 
        
        poolsInfoUserRecord.$watch(function(data) {
            $rootScope.howManyPoolsUserHas = poolsInfoUserRecord.length;
            console.log($rootScope.howManyPoolsUserHas);
        });
      }
    });
    
    var returnObj = {
        addPool : function(poolProp) {
            console.log(poolProp.name + ' ' + poolProp.fund);
            addPool_fund = poolProp.fund; 
            poolsInfo.$add({
                name: poolProp.name,
                date: Firebase.ServerValue.TIMESTAMP
            }).then(function(ref) {
                var id = ref.key();
                poolProp={};
                returnObj.joinPool(id, addPool_fund, true);
                // console.log("check if poolProp.fund is passed to this function:" + poolProp.fund);
                console.log(ref);
                console.log(id);
            }); // Note: Because 'then' gives the id stright away, the joinPool needs to change correspondingly.
        },
        
        // The keyDelete is an OBJECT !!
        deletePool : function(keyDelete) {
            returnObj.quitPool(keyDelete);
            keyDelete = keyDelete.$id;
            console.log("Deletion of " + keyDelete + "is called.");
            // poolsInfo.$remove(keyDelete);
            poolsInfo.$remove(poolsInfo.$indexFor(keyDelete));
        },
        
        // The keyJoin is an actual key given by HTML.
        joinPool : function(keyJoin, fund, isOwner) {
            if(isOwner === true) {
                var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + keyJoin + '/poolees');
                
                // --------------- Owner Reg
                var poolownerRef = new Firebase(FIREBASE_URL + 'pools/' + keyJoin + '/poolowner');
                var poolowner = $firebaseArray(poolownerRef);
                console.log("Becoming the owner.");
                poolowner.$add({
                    owner : $rootScope.currentUser.regUser,
                    username : $rootScope.currentUser.username
                });
            } 
            else {
                console.log("Wont become the owner.");
                // --------------- Owner Reg
                
                keyJoin = poolsInfo.$keyAt(keyJoin);
                console.log("The next line should be pool's id");
                console.log("The pool id is" + keyJoin);
                // Global because its used to add pool in users' pools.
                console.log("Pool's id is: " + keyJoin);
                var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + keyJoin + '/poolees');
            }
            var poolees = $firebaseArray(pooleesRef);
            
            // MUST have $loaded or the LENGTH of array is 0.
            joinPool_fund = fund;
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
                        console.log("Becoming a poolee. " + "There are now " + poolees.length + " poolees");
                        // console.log(poolees);
                        poolees.$add({
                            poolee : $rootScope.currentUser.regUser,
                            username : $rootScope.currentUser.username,
                            fund : joinPool_fund
                        }).then(function() {
                            console.log("Is a poolee. " + "There are now " + poolees.length + " poolees");
                            returnObj.joinPoolInUserRecord(keyJoin);
                        });
                        returnObj.addPoints(-joinPool_fund);
                    }
                }
            });
            
            /**
             * The following is not a function... dont know why, try do it in onAuth().
             */
            // poolees.$watch().then(function() {
            //     console.log("There are" + poolees.length + " poolees")
            //     if(poolees.length = 5) {
            //         // Action to share!
            //     }
            // });
        },
        
        // The keyJoinRecord parameter is an actual key given by joinPool.
        joinPoolInUserRecord : function(keyJoinRecord) {
            // Push generates hash code while update dont, so to avoid overwriting:
            var Ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser).child('userPools').push({
                pool : keyJoinRecord
            });
        },
        
        // The keyQuit parameter is an OBJECT passed by html.
        quitPool : function(keyQuit) {
            var keyQuit = keyQuit.$id;
            console.log("Pool's id is: " + keyQuit);
            var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + keyQuit + '/poolees');
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
                        returnObj.addPoints(aPoolee.fund);
                        poolees.$remove(aPoolee);
                        console.log("Calling user-record remover function with id: " + keyQuit);
                        returnObj.quitPoolInUserRecord(keyQuit);
                    } 
                } 
            });
        },
        
        // The keyQuitRecord parameter is an actual key given by quitPool.
        quitPoolInUserRecord : function(keyQuitRecord) {
            var userPoolsRefObj = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser + '/userPools');
            var userPoolsRef = new $firebaseArray(userPoolsRefObj);
            console.log("User-record is: ");
            console.log(userPoolsRef);
            console.log("Called with id: " + keyQuitRecord);

            userPoolsRef.$loaded().then(function() {
                // for(aUserPoolIndex in userPoolsRef) {
                // <<<<<<<<<< Last line won't work...
                // >>>>>>>>>> Next 2 lines work fine...
                var i = 0;
                for(i = 0; i < userPoolsRef.length; i++) {
                    var aUserPool = userPoolsRef.$getRecord(userPoolsRef.$keyAt(i));
                    console.log(i + ' is ' + aUserPool);
                    if(aUserPool.pool == keyQuitRecord) {
                        console.log(aUserPool.pool)
                        console.log("Removing " + aUserPool + " in user's record, which contains " + keyQuitRecord);
                        userPoolsRef.$remove(aUserPool);
                    }
                }
            });
        },
        
        // testIndex : function(testIndexPara) {
        //     console.log("testIndex() is called.");
        //     console.log(testIndexPara);
        //     var keyQuit = testIndexPara.$id;
        //     console.log(keyQuit);
        // }
        
        showPool : function(keyShow) {
            var keyShow = keyShow.$id;
            $rootScope.pooltoshow = keyShow;
            var pooleesRef = new Firebase(FIREBASE_URL + 'pools/' + keyShow + '/poolees');
            var pooleesInfo = $firebaseArray(pooleesRef);
            $rootScope.poolmemberstoshow = pooleesInfo; // Also used in punish()
            $state.go('tabsController.publicGoodsMembers');
        },
        
        addPoints : function(x) {
            var Ref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.regUser).update({
                points : $rootScope.currentUser.points + x
            });
        },
        
        punish : function(keyPunish) {
            returnObj.addPoints(-1);
            keyPunish = $rootScope.poolmemberstoshow.$keyAt(keyPunish);
            console.log($rootScope.pooltoshow);
            var punishRef = new Firebase(FIREBASE_URL + 'pools/' + $rootScope.pooltoshow + '/poolees/' + keyPunish);
            var punishInfo = $firebaseArray(punishRef);
            // If not loaded, object is ok but each record is null.
            punishInfo.$loaded().then(function (data) {
                if (punishInfo.$getRecord("punishment") == null) {
                    punishmentValue = 0;
                } else {
                    punishmentValue = punishInfo.$getRecord("punishment").$value;
                }
                punishRef.update({
                    punishment: punishmentValue + 10
                });
            });
        }
    }
    
    return returnObj;
}])