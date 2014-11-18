angular.module('punktlichDep').controller('AuthenticationController', function($scope, AuthenticationService, RegistrationService) {
    $scope.login = function (email, password) {
        console.log(email, password, $scope)
        AuthenticationService.login(email, password);
    };

    $scope.register = function (firstname, lastname, email, password, passwordRepeat) {
      RegistrationService.register(firstname, lastname, email, password, passwordRepeat);
    };
});
