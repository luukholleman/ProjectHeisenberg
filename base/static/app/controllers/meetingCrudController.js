angular.module('punktlichDep').controller('MeetingCreateController', function ($scope, $location, $routeParams, Restangular, MeetingService, ValidationService) {

    $scope.meeting = {};

    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    var box = document.getElementById('filter-box');

    Restangular.all('users').getList().then(function (users) {
        box.setData(_.each(_.toArray(users), function (user) {
            user.meta = {
                id: user.id,
                img: "http://lorempixel.com/24/24/people",
                name: user.first_name + " " + user.last_name,
                show: true
            };
        }));
    });

    $scope.save = function (form) {
        $scope.meeting.invitations = _.map($scope._invitations, function (participant) {
            return {user: participant.id};
        });

        MeetingService.create($scope.meeting, function (data) {
            $location.path('meeting/' + data.id + '/update');
        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };

    box.addEventListener('core-activate', function () {
        $scope._invitations = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingUpdateController', function ($scope, MeetingService, Restangular, $stateParams, ValidationService) {
    var box = document.getElementById('filter-box');

    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    MeetingService.get($stateParams.id).get().then(function (data) {
        $scope.meeting = data;

        Restangular.all('users').getList().then(function (users) {
            box.setData(_.each(_.toArray(users), function (user) {
                user.meta = {
                    id: user.id,
                    img: "http://lorempixel.com/24/24/people",
                    name: user.first_name + " " + user.last_name,
                    show: true
                };
            }));

            box.setSelected($scope.meeting.invitations, function (listItem, invitation) {
                return listItem.meta.id == invitation.user;
            });
        });

    });

    $scope.save = function (form) {
        $scope.meeting.invitations = _.map($scope._invitations, function (participant) {
            return {user: participant.id};
        });

        MeetingService.update($scope.meeting, function () {

        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };

    box.addEventListener('core-activate', function () {
        $scope._invitations = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingDetailController', function ($scope, $http, $sce, Restangular, $stateParams, $rootScope, MeetingService, FileUploadService) {

    $scope.meeting = [];

    $scope.users = [];

    MeetingService.get($stateParams.id).get().then(function (data) {
        $scope.meeting = data;

        // fetch all user data
        $scope.meeting.invitations.forEach(function (invitation, i) {
            Restangular.one('users', invitation.user).get().then(function (user) {
                $scope.users.push(user);
            });
        });
    });

    $scope.uploadAgenda = function (file) {
        var agendaFileElement = document.querySelector('#agenda-file');
        agendaFileElement.click();

        agendaFileElement.addEventListener('change', function (e) {

            var reader = new FileReader();
            reader.onload = function(event) {
                var contents = event.target.results;
                console.log(content);
            };

            reader.readAsArrayBuffer($scope.file);

            var fd = new FormData();
            fd.append('file', $scope.file);
            fd.append('name', 'wee');

            console.log($scope.file);

            console.log($scope.meeting.withHttpConfig({transformRequest: angular.identity}).customPOST(fd, 'agenda', undefined, {'Content-Type': undefined})).then(function (response) {
                console.log('Weeeeee!!!');
            });

            //FileUploadService.uploadToUrl($scope.file.agenda, '/api/v1/meetings/' + $scope.meeting.id + '/agenda');
        });
    };

    $scope.uploadAttachment = function () {
        var attachmentFileElement = document.querySelector('#attachment-file');
        attachmentFileElement.click();
    };

    $scope.uploadMinute = function () {
        var attachmentFileElement = document.querySelector('#attachment-file');
        attachmentFileElement.click();
    };
});

angular.module('punktlichDep').directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});