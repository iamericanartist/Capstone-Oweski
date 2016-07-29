"use strict";

var app = angular.module("MovieApp", ["ngRoute"]);   // ngRoute is being injected into our app here

app.config(function($routeProvider) {               // links the controllers to the partials
  $routeProvider
   .when('/login', {                                 // when I'm at "/select" 
     templateUrl: 'partials/loginRegister.html',    // go to this partial...
     controller: 'loginRegisterCtrl'                // using this controller.
   })
   .when('/searchDatabase', {
     templateUrl: 'partials/searchDatabase.html',
     controller: 'searchDatabaseCtrl'
   });
   // .when('/input', {
   //   templateUrl: 'partials/inputMadlib.html',
   //   controller: 'inputMadlibCtrl'
   // })
   // .when('/output', {
   //   templateUrl: 'partials/outputMadlib.html',
   //   controller: 'outputMadlibCtrl'
   // })
   // .when('/login', {
   //   templateUrl: 'partials/loginRegister.html',
   //   controller: 'loginCtrl'
   // })
   // .when('/logout', {
   //   templateUrl: 'partials/loginRegister.html',
   //   controller: 'loginCtrl'
   // })
   // .when('/beesknees', {
   //   templateUrl: 'partials/inputMadlib.html',
   //   controller: 'inputMadlibCtrl'
   // });
});