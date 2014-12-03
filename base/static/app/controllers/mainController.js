angular.module('punktlichDep').controller('MainController', function ($scope, FlashMessageService, AuthenticationService, $state) {
    $scope.flash = FlashMessageService;

    $scope.goto = function (route) {
        $state.go(route);
    }

    var authToken = localStorage.getItem('authentication-token');

    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    }
});
