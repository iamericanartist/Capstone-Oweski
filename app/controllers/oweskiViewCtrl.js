"use strict";

app.controller("oweskiViewCtrl", function($scope, $route, AuthFactory, UsersFactory, OweskiFactory){    // injecting the scope here...
  $scope.registerMode = true;                                 // ...from loginRegister.html

  $scope.userID = AuthFactory.getUser();                      // sets userID with getUser() in the AuthFactory

  $scope.oweskis = [];                                        // sets an empty array to be added to below
  $scope.oweski = {};                                         // sets an empty array to be added to below
  $scope.oweski.tags = "";                                    // line 9 & 10 are for new oweskis


  UsersFactory.getUsers()                                     // gets list of existing users from UsersFactory
  .then(function(result){                                     // then...
    console.log("list of users",result);                      // ...console logs results, and...
    let userArr = [];                                         // ...creates an empty array to be filled with the ...
    angular.forEach(result, (v, i) => {                       // ...results using "value" and key to...
      userArr.push(v);                                        // ...push user emails into the array
    });
    console.log("List of users", userArr);                    // conlogs our userArr
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
    console.log("asdf", oweski);
    
    OweskiFactory.postOweski(oweski)                          // sends above oweski to Firebase using postOweski in QweskiFactory
    .then(function(result){console.log("The +1 Oweski Posted", result);         // conlog results of postOweski
    Materialize.toast("+1 Oweski for me with " + oweski.user2, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    });
  };


  $scope.updateAddOweski = function(oweskiToUpdate){          // adding "updateAddOweski" function to the scope (this is like a temporary container)
    let oweski = {};
    oweski.user1 = oweskiToUpdate.user1;                      // adds user1 in THIS OWESKI
    oweski.user2 = oweskiToUpdate.user2;                      // adds user2 in THIS OWESKI
console.log("asdfasdf", oweskiToUpdate);  //delete me
    if (oweski.user1 === AuthFactory.getUserEmail()){           // if "you" are verified as user1 in the Oweski...
      oweski.count = oweskiToUpdate.count +1;                 // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast("+1 Oweski for me with " + oweski.user2, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    } else {                                                  // ...otherwise...
      oweski.count = oweskiToUpdate.count -1;                 // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast("+1 Oweski for me with " + oweski.user1, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    }
    oweski.tags = oweskiToUpdate.tags;                                // adds tags separated by " " (spaces)
    console.log("updateAddOweski", oweski);
    OweskiFactory.putOweski(oweskiToUpdate.id, oweski);
    $route.reload();
  };


  $scope.minusOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = -1;                                        // sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");
    
    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("The -1 Oweski Posted", result);
    Materialize.toast("-1 Oweski for me with " + oweski.user2, 5000, "red");    // Materialize TOAST message confirming -1 Oweski
    });
  };


  $scope.updateMinusOweski = function(minusOweskiToUpdate){   // adding "updateMinusOweski" function to the scope
    let oweski = {};
    oweski.user1 = minusOweskiToUpdate.user1;                 // adds user1 in THIS OWESKI
    oweski.user2 = minusOweskiToUpdate.user2;                 // adds user2 in THIS OWESKI

    if (oweski.user1 === AuthFactory.getUserEmail){           // if "you" are verified as user1 in the Oweski...
      oweski.count = minusOweskiToUpdate.count -1;            // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast("-1 Oweski for me with " + oweski.user2, 5000, "red");  // Materialize TOAST message confirming -1 Oweski
    } else {                                                  // ...otherwise...
      oweski.count = minusOweskiToUpdate.count +1;            // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast("-1 Oweski for me with " + oweski.user1, 5000, "red");  // Materialize TOAST message confirming -1 Oweski
    }
    oweski.tags = minusOweskiToUpdate.tags;                                // adds tags separated by " " (spaces)
    console.log("updateMinusOweski", oweski);
    OweskiFactory.putOweski(minusOweskiToUpdate.id, oweski);
    $route.reload();
  };


  $scope.randOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = Math.round(Math.random()) === 0 ? -1 : 1;        // if 0 then = -1, otherwise 1 ~ sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");

    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("RandOweski Posted", result);
    Materialize.toast(oweski.count + " Rand-Oweski for me with " + oweski.user2, 5000, "orange");   // Materialize TOAST message  confirming ? Rand-Oweski
    });
  };


  $scope.updateRandOweski = function(ramdOweskiToUpdate){           // adding "updateRandOweski" function to the scope
    let oweski = ramdOweskiToUpdate;
    oweski.user1 = ramdOweskiToUpdate.user1;                        // adds user1 in THIS OWESKI
    oweski.user2 = ramdOweskiToUpdate.user2;                        // adds user2 in THIS OWESKI
    let randOweCount = Math.round(Math.random()) === 0 ? -1 : 1;    // if 0 then = -1, otherwise 1

    if (oweski.user1 === AuthFactory.getUserEmail){                 // if "you" are verified as user1 in the Oweski...
      oweski.count = ramdOweskiToUpdate.count -randOweCount;        // ...adjusts count based on user#...  which is always relative to user1...
      Materialize.toast(randOweCount + "Oweski for me with " + oweski.user2, 5000, "orange");  // Materialize TOAST message confirming -1 Oweski
    } else {                                                        // ...otherwise...
      oweski.count = ramdOweskiToUpdate.count +randOweCount;        // ...and inversely relative if you are user2 in the Oweski instance
      Materialize.toast(randOweCount + "Oweski for me with " + oweski.user1, 5000, "orange");  // Materialize TOAST message confirming -1 Oweski
    }
    oweski.tags = ramdOweskiToUpdate.tags;                                      // adds tags separated by " " (spaces)
    console.log("updateRandOweski", oweski);
    OweskiFactory.putOweski(ramdOweskiToUpdate.id, oweski);
    $route.reload();
  };


});
