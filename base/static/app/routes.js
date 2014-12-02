angular.module('punktlichDep').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.
            otherwise('/');

        $stateProvider.
            state('index', {
                url: '/',
                views: {
                    timeline: {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    },
                    content: {
                        templateUrl: appPath + 'templates/meeting-list.html',
                        controller: 'TimelineController'
                    }
                }
            }).
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
            state('timeline', {
                url: '/timeline',
                views: {
                    timeline: {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    },
                    content: {
                        templateUrl: appPath + 'templates/timeline/meetings.html',
                        controller: 'MeetingController'
                    }
                }
            }).
            state('meeting-create', {
                url: '/meeting/create',
                views: {
                    timeline: {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    },
                    content: {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingCreateController'
                    }
                }
            }).
            state('meeting-update', {
                url: '/meeting/:id/update',
                views: {
                    timeline: {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    },
                    content: {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingUpdateController'
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
            });
    }]);