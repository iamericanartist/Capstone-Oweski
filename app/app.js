"use strict";

var app = angular.module("OweSkiApp", ["ngRoute"]);                       // "OweSkiApp" is the name of our ng-app in HTML  /  ngRoute is being injected into our app here
    app.constant('FirebaseURL', "https://oweski-180c3.firebaseio.com/");  // setting value of 'FirebaseURL' as the Firebase link / can be done for any variables


app.config(function($routeProvider, FireCreds) {                          // links the controllers to the partials

  let authConfig = {
    apiKey: FireCreds.apiKey,
    authDomain: FireCreds.authDomain
  };
  firebase.initializeApp(authConfig);


  $routeProvider                                    // ALL ROUTING INFORMATION
   .when('/', {                                     // WHEN at "/"...
     templateUrl: 'partials/loginRegister.html',    // ...show this partial...
     controller: 'loginRegisterCtrl'                // ...using this controller.
   })
   .when('/main', {                                 // WHEN at "/main"...
     templateUrl: 'partials/main.html',             // ...show this partial...
     controller: 'mainCtrl'                         // ...using this controller.
   })
  .otherwise('/main');                              // OTHERWISE go to this partial (MAIN)...
});                                                 // end of app.config

   // .when('/input', {
   //   templateUrl: 'partials/profile.html',
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

$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

// $(".button-collapse").sideNav();
