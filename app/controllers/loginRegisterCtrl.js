"use strict";

app.controller("loginRegisterCtrl", function($scope) {    //injecting the scope here
  $scope.register = true;                                 //from loginRegister.html

  $scope.activateRegisterMode = function(){               //this is where we set either to the "on state"
    $scope.registerMode = true;
  }
  $scope.activateLoginMode = function(){
    $scope.registerMode = false;
  }

  
});