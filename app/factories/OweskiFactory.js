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


  let getOweski = function(currentUserID) {
    console.log("userID", currentUserID);
    let oweskis = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/oweskis.json?orderBy="user1"&equalTo="${currentUserID}"`)
        .success(function(oweskiObject) {
          let oweskiCollection = oweskiObject;
          Object.keys(oweskiCollection).forEach(function(key) {
            oweskiCollection[key].id = key;
            oweskis.push(oweskiCollection[key]);
          });
          resolve(oweskis);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };


  var deleteOweski = function(oweskiID) {
    console.log(oweskiID, "this is a deleted oweski");
    return $q((resolve, reject) => {
      $http.delete(
        `${FirebaseURL}/oweskis/${oweskiID}.json`
      )
        .success((data) => {
          resolve(data);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  return {postOweski, getOweski, deleteOweski};
});
