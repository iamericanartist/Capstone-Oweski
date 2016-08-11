"use strict";

app.factory("OweskiFactory", function(FirebaseURL, $q, $http){
  
  const postOweski = function(newOweski){           // creation of NEW OWESKIs 
    return $q(function(resolve, reject){            // Angular Promise for posting to Firebase
      $http.post(`${FirebaseURL}/oweskis.json`,     // Angular XHR - post: only method that stringifies 
        JSON.stringify(newOweski))                  // adds the stringified data
      .success(function(){
        resolve();
      })
      .error(function(error){
        reject(error);
      });
    });
  };


  let getOweski = function(currentUserEmail, userNum) {
    console.log("GETOWESKI, currentUserEmail", currentUserEmail);
    let oweskis = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/oweskis.json?orderBy="user${userNum}"&equalTo="${currentUserEmail}"`)
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

  let putOweski = 


  let deleteOweski = function(oweskiID) {
    console.log(oweskiID, "this is a deleted oweski");
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}/oweskis/${oweskiID}.json`)
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
