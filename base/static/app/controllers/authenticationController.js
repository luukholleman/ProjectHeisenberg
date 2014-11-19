angular.module('punktlichDep').controller('AuthenticationController', function ($scope, AuthenticationService, RegistrationService, ValidationService) {
    $scope.isInvalid = function (element) {
        if ($scope.errors.length == 0)
            return false;

        return $scope.errors[element] ? true : false;
    };

    $scope.getErrors = function (element) {
        return $scope.isInvalid(element) ? $scope.errors.join(', ') : '';
    };

    $scope.login = function (email, password) {
        AuthenticationService.login(email, password);
    };

    $scope.register = function (form, user) {
        var valid = ValidationService.validateClientSide(form);

        if (valid) {
            RegistrationService.register(user, function () {
                console.log('User succesfully saved');
            }, function (errors) {
                ValidationService.showErrors(form, errors)
            });
        }
    };
});
