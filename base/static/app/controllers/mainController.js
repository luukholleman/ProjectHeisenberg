angular.module('punktlichDep').controller('MainController', function ($scope, $rootScope, $state, $location, FlashMessageService, AuthenticationService) {
    function checkAuth() {
        function checkStateAuthentication() {
            if(!$state.current.data || typeof $state.current.data.authenticationRequired === 'undefined' || $state.current.data.authenticationRequired) {
                if (['login', 'register'].indexOf($state.current.name) == -1) {
                    $state.go('login');
                }
            }
        }

        var authToken = localStorage.getItem('authentication-token');
        if (authToken != null) {
            AuthenticationService.setToken(authToken);
            AuthenticationService.getAuthenticatedUser(function (user) {
                $rootScope.user = user;
            }, checkStateAuthentication);

        } else {
            checkStateAuthentication();
        }
    };

    $scope.$on('$stateChangeSuccess', checkAuth);
    $scope.$on('unauthorizedRequest', function() {
        AuthenticationService.resetToken();
        $scope.goto('login');
    });

    $scope.goto = function (route, params) {
        $scope.onHome = $location.path() === '/';
        $state.go(route, params);
    };

    $scope.getFlashMessage = FlashMessageService.getMessage;
});
