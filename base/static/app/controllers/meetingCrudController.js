angular.module('punktlichDep').controller('MeetingCreateController', function ($scope, $location, $routeParams, Restangular, MeetingService, ValidationService) {
    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    $scope.save = function (form) {
        MeetingService.create($scope.meeting, function (data) {
            $scope.goto('meetings.update', {meetingid: data.id});
        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };

});

angular.module('punktlichDep').controller('MeetingUpdateController', function ($scope, MeetingService, Restangular, $stateParams, ValidationService) {
    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    MeetingService.get($stateParams.meetingid).get().then(function (data) {
        $scope.meeting = data;
    });

    $scope.save = function (form) {
        MeetingService.update($scope.meeting, function () {

        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };

    box.addEventListener('core-activate', function () {
        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingDetailController', function ($scope, $http, $sce, Restangular, FlashMessageService, $stateParams, $rootScope, MeetingService) {
    $scope.users = [];


    $scope.fetchMeeting = function () {
        MeetingService.get($stateParams.meetingid).get().then(function (meeting) {
            $scope.meeting = meeting;
        }, function () {
            FlashMessageService.setMessage('Meeting could not be found');
            $scope.goto('meetings.list');
        });
    };

    $scope.fetchMeeting();


    var fileElement = document.querySelector('.file-upload');

    $scope.fileSelected = function (e) {
        var type = fileElement.getAttribute('file-type');
        $scope.meeting.postFile(type, e.files[0], function (success) {
            $scope.fetchMeeting();
            FlashMessageService.setMessage('Your file has been uploaded');
        }, function (error) {
            FlashMessageService.setMessage(error.data.file[0], false);
        });
    };

    $scope.uploadAgenda = function (file) {
        fileElement.setAttribute('file-type', 'agenda');
        fileElement.click();
    };

    $scope.uploadAttachment = function () {
        fileElement.setAttribute('file-type', 'attachment');
        fileElement.click();
    };

    $scope.uploadMinute = function () {
        fileElement.setAttribute('file-type', 'minute');
        fileElement.click();
    };
});
