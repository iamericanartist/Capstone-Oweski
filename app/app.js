"use strict";

var app = angular.module("OweSkiApp", ["ngRoute"]);                       // "OweSkiApp" is the name of our ng-app in HTML  /  ngRoute is being injected into our app here
    app.constant('FirebaseURL', "https://oweski-180c3.firebaseio.com/");  // setting value of 'FirebaseURL' as the Firebase link / can be done for any variables


app.config(function($routeProvider, FireCreds) {                          // links the controllers to the partials

  $routeProvider                                    // ALL ROUTING INFORMATION
   .when('/', {                                     // WHEN at "/"...
     templateUrl: 'partials/splash.html',           // ...show this partial...
     // controller: 'loginRegisterCtrl'             // ...using this controller.  NOT NEEDED
   })
   .when('/loginReg', {                             // WHEN at "/loginReg"...
     templateUrl: 'partials/loginRegister.html',    // ...show this partial...
     controller: 'loginRegisterCtrl'                // ...using this controller.
   })
   .when('/main', {                                 // WHEN at "/main"...
     templateUrl: 'partials/main.html',  //FIX ME             // ...show this partial...
     // controller: 'mainCtrl'  //FIX ME                       // ...using this controller.
   })
   .when('/logoutSplash', {                         // WHEN at "/logoutSplash"...
     templateUrl: 'partials/logoutSplash.html',  //FIX ME          // ...show this partial...
     // controller: 'logoutSplash'  //FIX ME                    // ...using this controller.
   })
   // .when('/account', {                              // WHEN at "/main"...
   //   templateUrl: 'partials/account.html',  //FIX ME          // ...show this partial...
   //   controller: 'accountCtrl'  //FIX ME                    // ...using this controller.
   // })
  .otherwise('/');                                  // OTHERWISE go to this partial (MAIN)...
});                                                 // end of app.config


$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );



//not used in this method - see bottom of AuthFactory as well
  // let authConfig = {
  //   apiKey: FireCreds.apiKey,
  //   authDomain: FireCreds.authDomain
  // };
  // firebase.initializeApp(authConfig);

