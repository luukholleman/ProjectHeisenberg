angular.module('punktlichDep').controller('MainController', function ($scope, $rootScope, $location, FlashMessageService, AuthenticationService, $state) {
    var authToken = localStorage.getItem('authentication-token');

    if (authToken != null) {
        AuthenticationService.setToken(authToken);

        AuthenticationService.getAuthenticatedUser(function(user){
            $rootScope.user = user;
        }, function(){
            if(window.location.pathname != '/login' && window.location.pathname != '/register') {
                window.location = '/login';
            }
        });

    } else {
        if(window.location.pathname != '/login' && window.location.pathname != '/register') {
            window.location = '/login';
        }
    }

    $scope.flash = FlashMessageService;

    $rootScope.$on('unauthorizedRequest', function() {
        AuthenticationService.resetToken();
        $scope.goto('login');
    });

    $scope.goto = function (route, params) {
        $scope.onHome = $location.path() === '/';

        $state.go(route, params);
    };
});
