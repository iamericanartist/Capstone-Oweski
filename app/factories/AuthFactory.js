"use strict";

app.factory("AuthFactory", function() {

  let currentUserId = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUserId = user.uid;
    } else {
        currentUserId = null;

        console.log("Not logged in");
        Materialize.toast("Please Log In! ", 5000, "red");
    }
  });

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
    return (currentUserId) ? true : false;
  };

  let getUser = function() {
    return currentUserId;
  };

  let logout = function() {
    currentUserId = null;
  };

  return {createUser, loginUser, isAuthenticated, getUser, currentUserId, logout};
});
