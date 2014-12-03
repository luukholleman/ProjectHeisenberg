angular.module('punktlichDep').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.
            otherwise('/');

        $stateProvider.
            /*
             * Not logged in
             */
            state('login', {
                url: '/login',
                views: {
                    body: {
                        templateUrl: appPath + 'templates/login.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('register', {
                url: '/register',
                views: {
                    body: {
                        templateUrl: appPath + 'templates/register.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('activate.token', {
                url: '/activate/:token',
                views: {
                    body: {
                        templateUrl: appPath + 'templates/activate.html',
                        controller: 'ActivationController'
                    }
                }
            }).

            /*
             * Meetings
             */
            state('meetings', {
                views: {
                    timeline: {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    }
                }
            }).
            state('meetings.list', {
                url: '/',
                views: {
                    "content@meetings": {
                        template: 'LIST'
                    }
                }
            }).
            state('meetings.create', {
                url: '/meeting/create',
                views: {
                    "content@meetings": {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingController'
                    }
                }
            }).
            state('meetings.update', {
                url: '/meeting/:id/update',
                views: {
                    "content@meetings": {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingUpdateController'
                    }
                }
            })
;
    }]);