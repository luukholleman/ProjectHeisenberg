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
            state('logout', {
                url: '/logout',
                views: {
                    '@': {
                        controller: function (AuthenticationService, $scope) {
                            AuthenticationService.resetToken();
                            $scope.goto('login');
                        }
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
                        controller: 'MeetingListController'
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
                        templateUrl: appPath + 'templates/meeting/agenda.html',
                        controller: 'FileDetailController'
                    }
                }
            }).
            state('meeting-detail.minutes-detail', {
                url: '/minutes/:minutesid',
                views: {
                    'right-sidebar@meeting-detail': {
                        templateUrl: appPath + 'templates/meeting/agenda.html',//todo
                        controller: 'FileDetailController'
                    }
                }
            }).
            state('meeting-detail.attachement-detail', {
                url: '/attachments/:attachmentid',
                views: {
                    'right-sidebar@meeting-detail': {
                        templateUrl: appPath + 'templates/meeting/agenda.html',//todo
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
            }).

            /*
             * Teams
             */
            state('teams', {
                url: '/team',
                views: {
                    '@': {
                        templateUrl: appPath + 'templates/team/base.html',
                        controller: 'TimelineController'
                    }
                }
            }).
            state('teams.update', {
                url: '/:teamid/update',
                views: {
                    '@teams': {
                        templateUrl: appPath + 'templates/team/form.html',
                        controller: 'TeamUpdateController'
                    }
                }
            });
    }]);