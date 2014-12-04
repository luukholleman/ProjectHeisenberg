angular.module('punktlichDep').controller('MainController', function ($scope, $location, FlashMessageService, AuthenticationService, $state) {
    $scope.flash = FlashMessageService;

    $scope.goto = function (route) {
        $scope.onHome = $location.path() === '/';

        $state.go(route);
    };

    var authToken = localStorage.getItem('authentication-token');

    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    }
});
