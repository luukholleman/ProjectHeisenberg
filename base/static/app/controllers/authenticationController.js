angular.module('punktlichDep').controller('AuthenticationController', function($scope, AuthenticationService) {
    $scope.punktlich = true;

    $scope.authenticate = function () {
      AuthenticationService('login');
    };

    $scope.register = function () {
      register();
    };

    $scope.authenticate();
});
