"use strict";

var app = angular.module("OweSkiApp", ["ngRoute", "ngMaterial"]);                       // "OweSkiApp" is the name of our ng-app in HTML  /  ngRoute is being injected into our app here
    app.constant('FirebaseURL', "https://oweski-180c3.firebaseio.com/");  // setting value of 'FirebaseURL' as the Firebase link / can be done for any variables


app.config(function($routeProvider, FireCreds) {    // links the controllers to the partials

  $routeProvider                                    // ALL ROUTING INFORMATION
   .when('/', {                                     // WHEN at "/"...
     templateUrl: 'partials/splash.html',           // ...show this partial...
   })
   .when('/loginReg', {                             // WHEN at "/loginReg"...
     templateUrl: 'partials/loginRegister.html',    // ...show this partial...
     controller: 'loginRegisterCtrl'                // ...using this controller.
   })
   .when('/main', {                                 // WHEN at "/main"...
     templateUrl: 'partials/main.html',             // ...show this partial...
     // controller: 'mainCtrl'              //FIX ME                       // ...using this controller.
   })
   .when('/newOweski', {                              // WHEN at "/main"...
     templateUrl: 'partials/newOweski.html',          // ...show this partial...
     controller: 'oweskiViewCtrl'                   // ...using this controller.
   })
   .when('/logoutSplash', {                         // WHEN at "/logoutSplash"...
     templateUrl: 'partials/logoutSplash.html',     // ...show this partial...
   })
  .otherwise('/main');                              // OTHERWISE go to this partial (MAIN)...
});                                                 // end of app.config


// MATERIALIZE INITIALIZATIONS
$('.button-collapse').sideNav({                     // needed JS for hamburger collapse menu to work
      menuWidth: 300,                               // Default is 240
      edge: 'left',                                 // Choose the horizontal origin
      closeOnClick: true                            // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

