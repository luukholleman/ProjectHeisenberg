var authenticationController = angular.module('authenticationController', []);

authenticationController.controller('authenticationController', ['$scope', 'authenticate', function($scope, authenticate) {
    $scope.punktlich = true;

    $scope.authenticate = function (){
      authenticate('login');
    };
}]);