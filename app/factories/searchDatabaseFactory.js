"use strict";

app.factory("SearchDatabaseFactory", function($q, $http){       //$q - angular promise, $http angulars ajax  - both injected into project

    let movieList = (searchText, page) => {
        return $q(function(resolve, reject){
            // making a call to the api  / ?s=${our search criteria + 'anything that starts with...'}
          $http.get(`http://www.omdbapi.com/?s=${searchText + '*'}&y=&plot=short&r=json&page=${page}`)
            .success(function(returnObject){ 
                console.log("movies query from OMDB",returnObject );      //return becomes "movieData" in the searchDatabaseCtrl (inconsequential naming)
                resolve(returnObject);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    let getMovieDetailsFromId = (movieId) => {
        return $q(function(resolve, reject){
          $http.get(`http://www.omdbapi.com/?i=${movieId}&plot=short&r=json`)
            .success(function(returnObject){ 
                resolve(returnObject);
            })
            .error(function(error){
                reject(error);
            });  
        }); 
    };

    return {movieList:movieList, getMovieDetailsFromId:getMovieDetailsFromId};      // object:key value (pair)
});