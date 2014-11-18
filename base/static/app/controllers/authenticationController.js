angular.module('punktlichDep').controller('AuthenticationController', function($scope, AuthenticationService) {
    $scope.authenticate = function () {
      AuthenticationService('login');
    };

    $scope.register = function () {
      register();
    };
});
