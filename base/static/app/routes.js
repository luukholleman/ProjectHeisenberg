angular.module('punktlichDep').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'AuthenticationController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);