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


  $scope.deleteOweskiCall = function(deleteThisOweski) {
    ItemStorage.deleteOweski(deleteThisOweski)                // deleteOweski from OweskiFactory.js
      .then((oweskiCollection) => {
        $scope.oweskis = oweskiCollection;                    // setting oweskiCollection
        $location.path("/partials/main");                     // redirecting our path to main partial
        ItemStorage.getoweskis()                              // getOweski from OweskiFactory.js
          .then((oweskiCollection) => {
            $scope.oweskis = oweskiCollection;                // "updating" oweskiCollection after delete
          });
      });
  };

});

