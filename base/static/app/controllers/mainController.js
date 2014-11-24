angular.module('punktlichDep').controller('MainController', function ($scope, FlashMessageService, AuthenticationService, $location) {
    $scope.flash = FlashMessageService;

    $scope.goto = function (route) {
        $location.path(route);
    }

    var authToken = localStorage.getItem('authentication-token');

    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    }
});
