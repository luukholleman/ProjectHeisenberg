angular.module('punktlichDep').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.
        otherwise('/');

    $stateProvider.
        state('punktlich', {
            resolve: {
                translation: function (LocalizationService) {
                    return LocalizationService.load();
                }
            }
        }).
        /*
         * Not logged in
         */
        state('punktlich.login', {
            url: '/login',
            views: {
                '@': {
                    templateUrl: appPath + 'templates/login.html',
                    controller: 'AuthenticationController'
                }
            },
            data: {
                authenticationRequired: false,
                authenticationProhibited: true
            }
        }).
        state('punktlich.logout', {
            url: '/logout',
            views: {
                '@': {
                    controller: function (AuthenticationService, $scope) {
                        AuthenticationService.resetToken();
                        $scope.goto('punktlich.login');
                    }
                }
            },
            data: {
                authenticationRequired: false
            }
        }).
        state('punktlich.register', {
            url: '/register',
            views: {
                '@': {
                    templateUrl: appPath + 'templates/register.html',
                    controller: 'AuthenticationController'
                }
            },
            data: {
                authenticationRequired: false,
                authenticationProhibited: true
            }
        }).
        state('punktlich.activate_token', {
            url: '/activate/:token',
            views: {
                '@': {
                    controller: 'ActivationController'
                }
            },
            data: {
                authenticationRequired: false
            }
        }).

        /*
         * Meetings
         */
        state('punktlich.meetings', {
            views: {
                '@': {
                    templateUrl: appPath + 'templates/base.html',
                    controller: 'TimelineController'
                }
            }
        }).
        state('punktlich.meetings.list', {
            url: '/',
            views: {
                '@punktlich.meetings': {
                    templateUrl: appPath + 'templates/timeline/meetings.html',
                    controller: 'MeetingListController'
                }
            }
        }).
        state('punktlich.meetings.create', {
            url: '/meeting/create',
            views: {
                '@punktlich.meetings': {
                    templateUrl: appPath + 'templates/meeting/form.html',
                    controller: 'MeetingCreateController'
                }
            }
        }).
        state('punktlich.meetings.update', {
            url: '/meeting/:meetingid/update',
            views: {
                '@punktlich.meetings': {
                    templateUrl: appPath + 'templates/meeting/form.html',
                    controller: 'MeetingUpdateController'
                }
            }
        }).

        /*
         * Meeting detail
         */
        state('punktlich.meeting-detail', {
            url: '/meeting/:meetingid',
            views: {
                '@': {
                    templateUrl: appPath + 'templates/meeting/detail.html',
                    controller: 'MeetingDetailController'
                }
            }
        }).
        state('punktlich.meeting-detail.agenda-detail', {
            url: '/agenda/:agendaid',
            views: {
                'right-sidebar@meeting-detail': {
                    templateUrl: appPath + 'templates/meeting/agenda.html',
                    controller: 'FileDetailController'
                }
            }
        }).
        state('punktlich.meeting-detail.minutes-detail', {
            url: '/minutes/:minutesid',
            views: {
                'right-sidebar@punktlich.meeting-detail': {
                    templateUrl: appPath + 'templates/meeting/minutes.html',
                    controller: 'FileDetailController'
                }
            }
        }).

        /*
         * Teams
         */
        state('punktlich.teams', {
            url: '/team',
            views: {
                '@': {
                    templateUrl: appPath + 'templates/base.html',
                    controller: 'TimelineController'
                }
            }
        }).
        state('punktlich.teams.update', {
            url: '/:teamid/update',
            views: {
                '@punktlich.teams': {
                    templateUrl: appPath + 'templates/team/form.html',
                    controller: 'TeamUpdateController'
                }
            }
        });
});