angular.module('punktlichDep').controller('MeetingDetailController', function ($scope, $http, $sce, Restangular, FlashMessageService, $stateParams, $rootScope, MeetingService) {
    $scope.users = [];

    function fetchMeeting () {
        var request = MeetingService.get($stateParams.meetingid).get();

        $scope.meeting = request.$object;

        request .then(null, function () {
            FlashMessageService.setMessage('Meeting could not be found');
            $scope.goto('meetings.list');
        });
    };

    fetchMeeting();

    var fileElement = document.querySelector('.file-upload');
    var fileType = 'agenda';

    $scope.fileSelected = function (e) {
        $scope.meeting.postFile(fileType, e.files[0], function (success) {
            fetchMeeting();
            FlashMessageService.setMessage('Your file has been uploaded');
        }, function (error) {
            FlashMessageService.setMessage(error.data.file[0], false);
        });
    };

    $scope.uploadAgenda = function (file) {
        fileType = 'agenda';
        fileElement.click();
    };

    $scope.uploadAttachment = function () {
        fileType = 'attachment';
        fileElement.click();
    };

    $scope.uploadMinute = function () {
        fileType = 'minute';
        fileElement.click();
    };
});