angular.module('punktlichDep').controller('MinutesDetailController', function ($scope) {
    console.log('MinutesDetailController');
});

angular.module('punktlichDep').controller('AgendaDetailController', function ($scope) {
    console.log('AgendaDetailController');
    if($scope.meeting) {
        loadForMeeting($scope.meeting);
    }
    $scope.$on('meetingLoaded', function () {
        loadForMeeting($scope.meeting);
    });

    function loadForMeeting(meeting) {
        console.log(meeting);

        var agendas = meeting.agendas;

        console.log(agendas);
    }
});

angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $stateParams, AttachmentModel) {
    var id = $stateParams.attachmentid;

    console.log(id);
    AttachmentModel.one(id).get().then(function (data) {
        console.log(data);
    });
});