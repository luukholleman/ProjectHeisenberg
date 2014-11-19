angular.module('punktlichDep').controller('AuthenticationController', function ($scope,
                                                                                $location,
                                                                                AuthenticationService,
                                                                                RegistrationService,
                                                                                ValidationService) {
    $scope.login = function (email, password) {
        AuthenticationService.login(email, password);
    };

    $scope.register = function (form, user) {
        var valid = ValidationService.validateClientSide(form);

        if (valid) {
            RegistrationService.register(user, function () {
                $location.path('/login');
            }, function (errors) {
                ValidationService.showErrors(form, errors)
            });
        }
    };
});
