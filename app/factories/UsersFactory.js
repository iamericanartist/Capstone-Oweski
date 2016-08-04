"use strict";

app.factory("UsersFactory", function(FirebaseURL, $q, $http){
  
  const postUser = function(newUser){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}/users.json`,     //post only method that stringifies
        JSON.stringify(newUser))
      .success(function(){
        resolve();
      })
      .error(function(error){
        reject(error);
      });
    });
  };  

  const getUsers = function(){
    return $q(function(resolve, reject){
      $http.get(`${FirebaseURL}/users.json`)
      .success(function(data){
        resolve(data);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  return {postUser, getUsers};    // invoked in loginRegisterCtrl.js in onRegisterClick

});