angular.module('punktlichDep').controller('AuthenticationController', function ($scope, AuthenticationService, RegistrationService) {

    $scope.errors = {};

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

    $scope.register = function (user) {
        // errors occured
        console.log('Error :-(');
        $scope.errors = errors;
        var form = document.querySelector('#register-form');
        console.log(form.querySelectorAll('paper-input-decorator'));
        var elements = form.querySelectorAll('paper-input-decorator');
        Array.prototype.forEach.call(elements, function (element) {
            element.isInvalid = true;
        });
        
        RegistrationService.register(user, function () {
            console.log('User succesfully saved');
        }, function (errors) {

        });
    };
});
