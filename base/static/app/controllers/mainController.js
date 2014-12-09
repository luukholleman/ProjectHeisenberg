angular.module('punktlichDep').controller('MainController', function ($scope, $location, FlashMessageService, AuthenticationService, $state) {
    var authToken = localStorage.getItem('authentication-token');

    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    } else {
        if(window.location.pathname != '/login' && window.location.pathname != '/register') {
            window.location = '/login';
        }
    }

    $scope.flash = FlashMessageService;

    $scope.goto = function (route, params) {
        $scope.onHome = $location.path() === '/';

        $state.go(route, params);
    };
});
