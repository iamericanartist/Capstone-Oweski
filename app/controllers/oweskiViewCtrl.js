"use strict";

app.controller("oweskiViewCtrl", function($scope, $route, AuthFactory, UsersFactory, OweskiFactory){    // injecting the scope here...
  $scope.registerMode = true;                                 // ...from loginRegister.html

  $scope.userID = AuthFactory.getUser();                      // sets userID with getUser() in the AuthFactory

  $scope.oweskis = [];                                        // sets an empty array to be added to below


  UsersFactory.getUsers()
  .then(function(result){
    console.log("list of users",result);
    let userArr = [];
    angular.forEach(result, (v, i) => {
      userArr.push(v);
    })
    console.log("teat", userArr);
    $scope.listOfUsers = userArr;
  });

  $scope.addOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = 1;
    oweski.tags = $scope.oweski.tags.split(" ");
    
    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("They Oweski Posted", result);
    });
  }

  $scope.randOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = Math.round(Math.random()) == 0 ? -1 : 1;       // if 0 then = -1, otherwise 1
    oweski.tags = $scope.oweski.tags.split(" ");

    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("RandOweski Posted", result);
    });
  }

});

