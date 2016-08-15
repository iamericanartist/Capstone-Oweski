"use strict";

app.factory("AuthFactory", function($location, $rootScope){

  let currentUserId = null;
  let currentUserEmail = null;


  let createUser = function(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };


  let loginUser = function (email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error){                             // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      Materialize.toast(errorMessage, 5000, "red");     //pop up error message
    });
  };


  let isAuthenticated = function(){
    return (currentUserId) ? true : false;              // Basically if statement: "if (currentUserId === true) return true, else return false" testing for user login
  };


  let getUser = function(){
    return currentUserId;                               // GETTER to give access to currentUserId
  };


  let getUserEmail = function(){
    return currentUserEmail;                            // GETTER to give access to currentUserEmail
  };


  let setUser = function(uid){
    currentUserId = uid;                                // SETTER to set currentUserId as "uid"
  };

  let setUserEmail = function(email){
    $rootScope.userEmail = email;
    currentUserEmail = email;                                // SETTER to set currentUserId as "uid"
  };


  let logout = function(){
    currentUserId = null;                               // Sets currentUserId as "null" (user is not logged in)
    currentUserEmail = null;                            // Sets currentUserEmail as "null"
  };


  return {createUser, loginUser, isAuthenticated, getUser, getUserEmail, setUser, setUserEmail, currentUserId, logout};
});



app.run(["$location", "FireCreds", "AuthFactory", function ($location, FireCreds, AuthFactory){
  const authConfig = {
    apiKey: FireCreds.apiKey,
    authDomain: FireCreds.authDomain,
    databaseURL: FireCreds.databaseURL,
    storageBucket: FireCreds.storageBucket
  };


  firebase.initializeApp(authConfig);


  firebase.auth().onAuthStateChanged(function (user){
    if (user){
      AuthFactory.setUser(user.uid);  // set current user upon login and switch to main view
      $location.url("/main");
      $scope.$apply();
      console.log("user/main", user.uid);
    } else {
      AuthFactory.setUser(null);      //this is to test the current user to hide board.
      $location.url("/");
      $scope.$apply();
    }
  });
}]);
