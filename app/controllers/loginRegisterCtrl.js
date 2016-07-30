"use strict";

app.controller("loginRegisterCtrl", function($scope, AuthFactory) {     // injecting the scope here
  $scope.registerMode = true;                                           // from loginRegister.html

  $scope.activateRegisterMode = function(){               // this is where REGISTER is set to the "on state"
    $scope.registerMode = true;
  };
  $scope.activateLoginMode = function(){                  // this is where LOGIN is set to the "on state"
    $scope.registerMode = false;
  };
  $scope.onRegisterClick = function(){
    AuthFactory.createUser($scope.regEmail, $scope.regPassword)
  };
  $scope.onLoginClick = function(){
    AuthFactory.loginUser($scope.loginEmail, $scope.loginPassword)
  };
});

