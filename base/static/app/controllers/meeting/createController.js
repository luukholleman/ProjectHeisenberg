angular.module('punktlichDep').controller('MeetingCreateController', function ($scope, $location, $routeParams, Restangular, MeetingService, ValidationService) {
    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    $scope.save = function (form) {
        MeetingService.create($scope.meeting, function (data) {
            $scope.goto('^.update', {meetingid: data.id});
        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };

});