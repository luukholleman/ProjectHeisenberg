angular.module('punktlichDep').controller('AuthenticationController', function($scope, AuthenticationService, RegistrationService) {

    $scope.authenticate = function () {
      AuthenticationService('login');
    };

    $scope.register = function (firstname, lastname, email, password, passwordRepeat) {
      var service = RegistrationService();
      service.register(firstname, lastname, email, password, passwordRepeat);
    };
});
