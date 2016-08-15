"use strict";

app.controller("oweskiViewCtrl", function($scope, $route, AuthFactory, UsersFactory, OweskiFactory, $location){    // injecting the scope here...
  $scope.registerMode = true;                                 // ...from loginRegister.html

  $scope.userID = AuthFactory.getUser();                      // sets userID with getUser() in the AuthFactory

  $scope.oweskis = [];                                        // sets an empty array to be added to below
  $scope.oweski = {};                                         // sets an empty array to be added to below
  $scope.oweski.tags = "";                                    // line 9 & 10 are for new oweskis


  UsersFactory.getUsers()                                     // gets list of existing users from UsersFactory
  .then(function(result){                                     // then...
    // console.log("list of users",result);                      // ...console logs results, and...
    let userArr = [];                                         // ...creates an empty array to be filled with the ...
    angular.forEach(result, (v, i) => {                       // ...results using "value" and key to...
      userArr.push(v);                                        // ...push user emails into the array
    });
    // console.log("List of users", userArr);                    // conlogs our userArr
    $scope.listOfUsers = userArr;                             // sets the userArr to our scoped "listOfUsers"
  });


  OweskiFactory.getOweski(AuthFactory.getUserEmail(), 1)
  .then(function(results){
    //show count here - display user 2 / THIS IS FOR OWESKI DISPLAY NUMBER ONLY
    // oweski.count = $scope.oweski.count * (-1);

    console.log("getOweskis as user1", results);
    results.forEach(function(result){
      $scope.oweskis.push(result);
    });
    OweskiFactory.getOweski(AuthFactory.getUserEmail(), 2)    
    .then(function(results){
    //reverse count here - display user 1 / THIS IS FOR OWESKI DISPLAY NUMBER ONLY
    // oweski.count = $scope.oweski.count;

      console.log("getOweskis as user2", results);
      results.forEach(function(result){
        $scope.oweskis.push(result);
      });
    });
  });


  $scope.addOweski = function(){                              // instantiate "addOweski" function to the scope
    let oweski = {};                                          // create new empty object to be appended below
    oweski.user1 = AuthFactory.getUserEmail();                // adds user1
    oweski.user2 = $scope.oweski.user2;                       // adds user2
    oweski.count = 1;                                         // sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");              // adds tags separated by " " (spaces)
    
    OweskiFactory.postOweski(oweski)                          // sends above oweski to Firebase using postOweski in QweskiFactory
    .then(function(result){console.log("The +1 Oweski Posted", result);         // conlog results of postOweski
    Materialize.toast("+1 Oweski for me with " + oweski.user2, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    $route.reload();                                          // reloads page automatically (manual reload wipes NG stuff)
    console.log("addOweski", oweski);                         // con log to show added "oweski"
    });
  };


  $scope.updateAddOweski = function(oweskiToUpdate){          // adding "updateAddOweski" function to the scope (this is like a temporary container)
    let oweski = {};
    oweski.user1 = oweskiToUpdate.user1;                      // adds user1 in THIS OWESKI instance
    oweski.user2 = oweskiToUpdate.user2;                      // adds user2 in THIS OWESKI instance
    console.log("PREUPDATE ADD", oweskiToUpdate.count);       // conlog of the PREUPDATE value

    if (oweski.user1 === AuthFactory.getUserEmail()){         // if "you" are verified as user1 in the Oweski...
      oweski.count = oweskiToUpdate.count +1;                 // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast("+1 Oweski for me with " + oweski.user2, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    } else {                                                  // ...otherwise...
      oweski.count = oweskiToUpdate.count -1;                 // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast("+1 Oweski for me with " + oweski.user1, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    }
    oweski.tags = oweskiToUpdate.tags;                        // adds tags separated by " " (spaces)
    OweskiFactory.putOweski(oweskiToUpdate.id, oweski)        // updates this Oweski in Firebase using putOweski in QweskiFactory
    .then(function(){
      $route.reload();
    });                                          // reloads page automatically (manual reload wipes NG stuff)
    console.log("updateAddOweski", oweski);                   // con log to show current "oweski"
  };


  $scope.minusOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = -1;                                                          // sets up  -1 count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");
    
    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("The -1 Oweski Posted", result);
    Materialize.toast("-1 Oweski for me with " + oweski.user2, 5000, "red");    // Materialize TOAST message confirming -1 Oweski
    $route.reload();
    console.log("minusOweski", oweski);
    });
  };


  $scope.updateMinusOweski = function(minusOweskiToUpdate){
    let oweski = {};
    oweski.user1 = minusOweskiToUpdate.user1;
    oweski.user2 = minusOweskiToUpdate.user2;
console.log("PREUPDATE MINUS", minusOweskiToUpdate.count);  //DELETE ME

    if (oweski.user1 === AuthFactory.getUserEmail()){                             // if "you" are verified as user1 in the Oweski...
      oweski.count = minusOweskiToUpdate.count -1;                              // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast("-1 Oweski for me with " + oweski.user2, 5000, "red");  // Materialize TOAST message confirming -1 Oweski
    } else {                                                                    // ...otherwise...
      oweski.count = minusOweskiToUpdate.count +1;                              // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast("-1 Oweski for me with " + oweski.user1, 5000, "red");  // Materialize TOAST message confirming -1 Oweski (as user 2 it is still -1 net)
    }
    oweski.tags = minusOweskiToUpdate.tags;
    OweskiFactory.putOweski(minusOweskiToUpdate.id, oweski)
    .then(function(){
      $route.reload();
    });   
    console.log("updateMinusOweski", oweski);
  };


  $scope.randOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = Math.round(Math.random()) === 0 ? -1 : 1;                    // if 0 then = -1, otherwise 1 ~ sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");

    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("RandOweski Posted", result);
    Materialize.toast(oweski.count + " Rand-Oweski for me with " + oweski.user2, 5000, "orange");   // Materialize TOAST message  confirming ? Rand-Oweski
    $route.reload();
    console.log("randOweski", oweski);
    });
  };


  $scope.updateRandOweski = function(ramdOweskiToUpdate){
    let oweski = ramdOweskiToUpdate;
    oweski.user1 = ramdOweskiToUpdate.user1;
    oweski.user2 = ramdOweskiToUpdate.user2;
    let randOweCount = Math.round(Math.random()) === 0 ? -1 : 1;
    console.log("PREUPDATE RAND", ramdOweskiToUpdate.count);                                    // conlog of the PREUPDATE value

    if (oweski.user1 === AuthFactory.getUserEmail){                                             // if "you" are verified as user1 in the Oweski...
      oweski.count = ramdOweskiToUpdate.count -randOweCount;                                    // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast(randOweCount + "Oweski for me with " + oweski.user2, 5000, "orange");   // Materialize TOAST message confirming randOweski
    } else {                                                                                    // ...otherwise...
      oweski.count = ramdOweskiToUpdate.count +randOweCount;                                    // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast(randOweCount + "Oweski for me with " + oweski.user1, 5000, "orange");   // Materialize TOAST message confirming randOweski
    }
    oweski.tags = ramdOweskiToUpdate.tags;
    OweskiFactory.putOweski(ramdOweskiToUpdate.id, oweski)
    .then(function(){
      $route.reload();
    });
    console.log("updateRandOweski", oweski);
  };


  $scope.deleteOweskiCall = function(oweskiToDelete) {              // ctrl for deleting Oweskis set on the $scope
    console.log("oweskiToDelete",oweskiToDelete.id );
    OweskiFactory.deleteOweski(oweskiToDelete.id)                   // references OweskiFactory where Angular XHR promise "deleteOweski" lives...
    .then((oweskiCollection) => {                                   // ...upon which "oweskiCollection" is populated...
      $route.reload();
      Materialize.toast("You deleted the Oweski!", 5000, "red");    // Materialize TOAST message confirming +1 Oweski
    });
  };

});
