"use strict";

app.controller("navCtrl", function($scope, $route, AuthFactory){      // injecting the scope here

  $scope.userIsAuthenticated = function(){
    return AuthFactory.isAuthenticated();
  };


  $scope.logout = function(){
    firebase.auth().signOut()
    .then(function(){
      // Sign-out successful.
      $route.reload();
      Materialize.toast("Aww, don't GoSki!", 5000, "grey");   // on successful login, Materialize TOAST message "Welcome User!"
      console.log(AuthFactory.getUser(), "Logged out");
      AuthFactory.setUser(null);
      
    }, function(error){
        // An error happened.
        console.log(error);
    });
  };
});
