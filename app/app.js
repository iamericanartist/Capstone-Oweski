"use strict";

var app = angular.module("OweSkiApp", ["ngRoute"]);                       // "OweSkiApp" is the name of our ng-app in HTML  /  ngRoute is being injected into our app here
    app.constant('FirebaseURL', "https://oweski-180c3.firebaseio.com/");  // setting value of 'FirebaseURL' as the Firebase link / can be done for any variables


app.config(function($routeProvider, FireCreds) {                          // links the controllers to the partials

  let authConfig = {
    apiKey: FireCreds.apiKey,
    authDomain: FireCreds.authDomain
  };
  firebase.initializeApp(authConfig);


  $routeProvider                                    // all routing information
   .when('/', {                                     // WHEN I'm at "/"...
     templateUrl: 'partials/loginRegister.html',    // ...go to this partial...
     controller: 'loginRegisterCtrl'                // ...using this controller.
   })
   .when('/main', {
     templateUrl: 'partials/main.html',
     controller: 'mainCtrl'
   })
  .otherwise('/pinhead/mainboard');                 // OTHERWISE go to this partial...
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

