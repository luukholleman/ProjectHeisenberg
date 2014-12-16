angular.module('punktlichDep').controller('MeetingDetailController', function ($scope, $http, $sce, Restangular, FlashMessageService, $stateParams, $rootScope, MeetingService) {
    $scope.users = [];

    MeetingService.get($stateParams.meetingid).get().then(function(meeting) {
        $scope.meeting = meeting;
        $scope.agendas = meeting.getAgendaRevisions();
        $scope.minutes = meeting.getMinutesRevisions();
        $scope.invited = $scope.meeting.getInvited();

    }, function () {
        FlashMessageService.setMessage('Meeting could not be found');
        $scope.goto('meetings.list');
    });

    var fileElement = document.querySelector('.file-upload');
    var fileType = 'agendas';

    $scope.fileSelected = function (e) {
        $scope.meeting.postFile(fileType, e.files[0], function (success) {
            fileElement.value = null;
            $scope.agendas = $scope.meeting.getAgendaRevisions();
            $scope.minutes = $scope.meeting.getMinutesRevisions();
            FlashMessageService.setMessage('Your file has been uploaded');
        }, function (error) {
            fileElement.value = null;
            FlashMessageService.setMessage(error.data.file[0], false);
        });
    };

    $scope.upload = function (type) {
        fileType = type;
        fileElement.click();
    };

    $scope.saveFilename = function(name) {
        $scope.agendas[0].patch({file_name: name});
    };
});