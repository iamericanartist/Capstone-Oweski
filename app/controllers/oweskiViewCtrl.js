"use strict";

app.controller("oweskiViewCtrl", function($scope, $route, AuthFactory, UsersFactory, OweskiFactory){    // injecting the scope here...
  $scope.registerMode = true;                                 // ...from loginRegister.html

  $scope.userID = AuthFactory.getUser();                      // sets userID with getUser() in the AuthFactory

  $scope.oweskis = [];                                        // sets an empty array to be added to below

  if (AuthFactory.isAuthenticated()) {                        // if user logged in and validated...
    ItemStorage.getOweski($scope.userID)                      // ...get this oweski with this userID...
      .then(function(oweskiCollection) {
        $scope.oweskis = oweskiCollection;                    // ...then reveal this userID's oweskiCollection

        $scope.selectedBoard = $scope.oweskis.filter(function(thisOweski) {     //???
          return thisOweski.id === $routeParams.boardId;                        //???
        })[0];    //???
      });
  } else {}


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