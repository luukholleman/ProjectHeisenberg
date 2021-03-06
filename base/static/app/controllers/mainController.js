angular.module('punktlichDep').controller('MainController', function ($scope, $rootScope, $state, $location, FlashMessageService, AuthenticationService) {
    function checkAuth() {
        function checkStateAuthentication() {
            if (!$state.current.data || typeof $state.current.data.authenticationRequired === 'undefined' || $state.current.data.authenticationRequired) {
                $state.go('punktlich.login');
            }
        }
        function checkStateAntiAuthentication() {
            if ($state.current.data && $state.current.data.authenticationProhibited) {
                $state.go('punktlich.meetings.list');
            }
        }

        var authToken = localStorage.getItem('authentication-token');
        if (authToken != null) {
            AuthenticationService.setToken(authToken);
            AuthenticationService.getAuthenticatedUser(function (user) {
                $rootScope.user = user;
                checkStateAntiAuthentication();
            }, checkStateAuthentication);

        } else {
            checkStateAuthentication();
        }
    };

    $scope.$on('$stateChangeSuccess', checkAuth);
    $scope.$on('unauthorizedRequest', function () {
        AuthenticationService.resetToken();
        $scope.goto('punktlich.login');
    });

    $rootScope.goto = function (route, params) {
        $scope.onHome = $location.path() === '/';
        $state.go(route, params);
    };

    $scope.getFlashMessage = FlashMessageService.getMessage;

    $rootScope.$onMany = function(events, fn) {
      for(var i = 0; i < events.length; i++) {
         this.$on(events[i], fn);
      }
   }
});
