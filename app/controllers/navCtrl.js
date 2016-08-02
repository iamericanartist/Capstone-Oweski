"use strict";

app.controller("navCtrl", function($scope, $route, AuthFactory){      // injecting the scope here
  // console.log("asdf");
  $scope.userIsAuthenticated = function(){
  // console.log("qwerty");
    return AuthFactory.isAuthenticated();
  };
  $scope.logout = function(){
     firebase.auth().signOut()
     .then(function(){
         // Sign-out successful.
         $route.reload();
         console.log(AuthFactory.getUser(), "Logged out");
         AuthFactory.setUser(null);
     }, function(error){
         // An error happened.
         console.log(error);
     });
    };
});
