angular.module('punktlichDep').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.
            otherwise('/');

        $stateProvider.
            state('index', {
                url: '/',
                views: {
                    "body": {
                        templateUrl: appPath + "templates/home.html",
                        controller: 'HomeController'
                    }
                }
            }).
            state('login', {
                url: '/login',
                views: {
                    'body': {
                        templateUrl: appPath + 'templates/login.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('register', {
                url: '/register',
                views: {
                    'body': {
                        templateUrl: appPath + 'templates/register.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('timeline', {
                'url': '/timeline',
                views: {
                    'body': {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    }
                }
            }).
            state('meeting-create', {
                url: '/meeting/create',
                views: {
                    'body': {
                        templateUrl: appPath + 'templates/meeting/create.html',
                        controller: 'MeetingController'
                    }
                }
            }).
            state('activate.token', {
                'url': '/activate/:token',
                views: {
                    'body': {
                        templateUrl: appPath + 'templates/activate.html',
                        controller: 'ActivationController'
                    }
                }
            });
    }]);