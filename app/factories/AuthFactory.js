"use strict";

app.factory("AuthFactory", function() {

  let currentUserId = null;

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //       currentUserId = user.uid;
  //   } else {
  //       currentUserId = null;

  //       console.log("Not logged in");
  //       Materialize.toast("Please Log In! ", 5000, "red");
  //   }
  // });

  let createUser = function(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(object){console.log("Register",object);
  });
      Materialize.toast(errorMessage, 5000, "green")

    .catch(function(error) {                                          // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("errorMessage", errorMessage);
      Materialize.toast(errorMessage, 5000, "orange");
    });
  };

  let loginUser = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(object){console.log("Login",object);
  });
      Materialize.toast(errorMessage, 5000, "blue")

    .catch(function(error) {                                          // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log("errorMessage", errorMessage);
    });
  };


  let isAuthenticated = function() {
    return (currentUserId) ? true : false;        //basically if statement if (currentUserId === true) return true, else return false testing for user login
  };

  let getUser = function() {
    return currentUserId;
  };

  let setUser = function(uid) {
    currentUserId = uid;
  };

  let logout = function() {
    currentUserId = null;
  };

  return {createUser, loginUser, isAuthenticated, getUser, currentUserId, logout};
});



app.run(["$location", "FireCreds", "AuthFactory", function ($location, FireCreds, AuthFactory) {
  const authConfig = {
    apiKey: FireCreds.apiKey,
    authDomain: FireCreds.authDomain,
    databaseURL: FireCreds.databaseURL,
    storageBucket: FireCreds.storageBucket
  };

  firebase.initializeApp(authConfig);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      AuthFactory.setUser(user.uid); //set current user on login, switch to main view
      $location.url("/main");
    } else {
      AuthFactory.setUser(null); //this is to rest the current user to hide board.
      $location.url("/splash");
    }
  });
}]);
