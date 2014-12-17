angular.module('punktlichDep').controller('MeetingUpdateController', function ($scope, MeetingService, Restangular, $stateParams, ValidationService, TeamModel) {
    $scope.hideGroupDropdown = true;

    MeetingService.get($stateParams.meetingid).get().then(function (data) {
        $scope.meeting = data;
    });

    $scope.save = function (form) {
        MeetingService.update($scope.meeting, null, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };
});