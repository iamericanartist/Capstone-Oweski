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

  return {postUser};

});