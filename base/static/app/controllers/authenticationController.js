var authenticationController = app.module('authenticationController', []);

authenticationController.controller('authenticationController', function($scope, authenticate, register) {
    $scope.punktlich = true;

    $scope.authenticate = function (){
      authenticate('login');
    };

    $scope.register = function () {
      register();
    };
});