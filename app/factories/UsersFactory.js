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

  const getUsers = function(){                    // getUsers from the Firebase dataset "users"
    return $q(function(resolve, reject){          // Angular promise ($q) that retrieves list of users...
      $http.get(`${FirebaseURL}/users.json`)      // ...from XHR ($http) request to the FirebaseURL 
      .success(function(data){                    // upon success,
        resolve(data);                            // resolve data
      })
      .error(function(error){                     // upon error,
        reject(error);                            // reject with error message
      });
    });
  };

  return {postUser, getUsers};    // invoked in loginRegisterCtrl.js in onRegisterClick

});