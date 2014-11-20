angular.module('punktlichDep').controller('AuthenticationController', function ($scope, $location, FlashMessageService, AuthenticationService, RegistrationService, ValidationService) {
    $scope.login = function (form, email, password) {
        var valid = ValidationService.validateClientSide(form);

        if (valid) {
            AuthenticationService.login(email, password, function(){
                $location.path('/');
                FlashMessageService.setMessage("You've logged in!");
            }, function(errors){
                ValidationService.showErrors(form, errors);
            });
        }
    };

    $scope.register = function (form, user) {
        var valid = ValidationService.validateClientSide(form);

        if (!valid) {
            return;
        }

        RegistrationService.register(user, function () {
            $scope.flash.setMessage('You are registered successfully!');
            // @todo authentication process login automatically redirect to index
            $location.path('/login');
        }, function (errors) {
            ValidationService.showErrors(form, errors)
        });
    };
});
