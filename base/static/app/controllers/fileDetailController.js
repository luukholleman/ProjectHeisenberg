angular.module('punktlichDep').controller('MinutesDetailController', function ($scope) {
    //@todo
});

angular.module('punktlichDep').controller('AgendaDetailController', function ($scope) {
    $scope.file = {};

    if($scope.meeting) {
        loadForMeeting($scope.meeting);
    }
    $scope.$on('meetingLoaded', function () {
        loadForMeeting($scope.meeting);
    });

    function loadForMeeting(meeting) {
        var agendas = meeting.agendas;

        if(agendas && agendas.length) {
            $scope.file = agendas[0];
        }
    }
});

angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $stateParams, AttachmentModel) {
    var id = $stateParams.attachmentid;

    console.log(id);
    AttachmentModel.one(id).get().then(function (data) {
        console.log(data);
    });

    //@todo
});