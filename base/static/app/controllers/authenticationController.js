angular.module('punktlichDep').controller('AuthenticationController', function ($scope, $location, FlashMessageService, AuthenticationService, RegistrationService, ValidationService) {
    $scope.login = function (form, email, password) {
        var valid = ValidationService.validateClientSide(form);

        if (valid) {
            AuthenticationService.login(email, password, function(){
                $location.path('/timeline');
                FlashMessageService.setMessage("You've logged in!");
            }, function(errors){
                ValidationService.showErrors(form, errors);
            });
        }
    };

    $scope.register = function (form, user) {
        var valid = ValidationService.validateClientSide(form);

        if (!valid) return;

        RegistrationService.register(user, function () {
            FlashMessageService.setMessage('You are registered successfully!');
            $scope.hasRegistered = true;
        }, function (errors) {
            ValidationService.showErrors(form, errors)
        });
    };
});
