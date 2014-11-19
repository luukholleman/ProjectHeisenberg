angular.module('punktlichDep').controller('AuthenticationController', function ($scope, AuthenticationService, RegistrationService) {
    $scope.login = function (email, password) {
        AuthenticationService.login(email, password);
    };

    $scope.register = function (firstname, lastname, email, password) {
        RegistrationService.register(firstname, lastname, email, password);
    };
});
