angular.module('punktlichDep').controller('AuthenticationController', function($scope, AuthenticationService) {
    $scope.login = function (email, password) {
        console.log(email, password, $scope)
        AuthenticationService.login(email, password);
    };

    $scope.register = function () {
      register();
    };
});
