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