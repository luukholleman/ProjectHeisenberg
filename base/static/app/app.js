var app = angular.module('punktlich', [
    'ngRoute',
    'authenticationController'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'authenticationController'
            }.
            when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'authenticationController'
            }).
            otherwise({
                redirectTo: '/login'
            }));
    }]);