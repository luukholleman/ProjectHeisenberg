
angular.module('punktlichDep').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: appPath + 'templates/login.html',
                controller: 'AuthenticationController'
            }).
            when('/register', {
                templateUrl: appPath + 'templates/register.html',
                controller: 'AuthenticationController'
            }).
            when('/activate/:token', {
                templateUrl: appPath + 'templates/activate.html',
                controller: 'ActivationController'
            }).
            otherwise({
                redirectTo: ''
            });
    }]);