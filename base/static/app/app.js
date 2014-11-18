var app = angular.module('punktlich', [
    'ngRoute',
    'authenticationController'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'authenticationController'
            }).
            when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'authenticationController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);