"use strict";

app.factory("OweskiFactory", function(FirebaseURL, $q, $http){
  
  const postOweski = function(newOweski){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}/oweskis.json`,     //post only method that stringifies
        JSON.stringify(newOweski))
      .success(function(){
        resolve();
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  return {postOweski};
});
