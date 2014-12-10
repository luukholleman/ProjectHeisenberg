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
                    '@': {
                        templateUrl: appPath + 'templates/login.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('register', {
                url: '/register',
                views: {
                    '@': {
                        templateUrl: appPath + 'templates/register.html',
                        controller: 'AuthenticationController'
                    }
                }
            }).
            state('activate.token', {
                url: '/activate/:token',
                views: {
                    '@': {
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
                    '@': {
                        templateUrl: appPath + 'templates/timeline.html',
                        controller: 'TimelineController'
                    }
                }
            }).
            state('meetings.list', {
                url: '/',
                views: {
                    '@meetings': {
                        templateUrl: appPath + 'templates/timeline/meetings.html',
                        controller: 'MeetingController'
                    }
                }
            }).
            state('meetings.create', {
                url: '/meeting/create',
                views: {
                    '@meetings': {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingCreateController'
                    }
                }
            }).
            state('meeting-detail', {
                url: '/meeting/:meetingid',
                views: {
                    '@': {
                        templateUrl: appPath + 'templates/meeting/detail.html',
                        controller: 'MeetingDetailController'
                    }
                }
            }).
            state('meeting-detail.agenda-detail', {
                url: '/agenda/:agendaid',
                views: {
                    'right-sidebar@meeting-detail': {
                        templateUrl: appPath + 'templates/meeting/file-detail.html',
                        controller: 'AgendaDetailController'
                    }
                }
            }).
            state('meeting-detail.minutes-detail', {
                url: '/minutes/:minutesid',
                views: {
                    'right-sidebar@meeting-detail': {
                        templateUrl: appPath + 'templates/meeting/file-detail.html',
                        controller: 'MinutesDetailController'
                    }
                }
            }).
            state('meeting-detail.attachement-detail', {
                url: '/attachments/:attachmentid',
                views: {
                    'right-sidebar@meeting-detail': {
                        templateUrl: appPath + 'templates/meeting/file-detail.html',
                        controller: 'AttachementDetailController'
                    }
                }
            }).
            state('meetings.update', {
                url: '/meeting/:meetingid/update',
                views: {
                    '@meetings': {
                        templateUrl: appPath + 'templates/meeting/form.html',
                        controller: 'MeetingUpdateController'
                    }
                }
            });
    }]);