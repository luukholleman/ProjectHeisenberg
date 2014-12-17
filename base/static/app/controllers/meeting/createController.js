angular.module('punktlichDep').controller('MeetingCreateController', function ($scope, $location, $routeParams, Restangular, MeetingService, ValidationService, TeamModel) {
    $scope.meeting = {};

    TeamModel.getList().then(function(teams){
        $scope.teams = teams;
    });

    var dropDown = document.querySelector('#team-dropdown');

    dropDown.addEventListener('core-select', function(item){
        var id = item.detail.item.getAttribute('teamid');

        $scope.meeting.team = id;
    });

    $scope.save = function (form) {
        MeetingService.create($scope.meeting, function (data) {
            $scope.goto('^.update', {meetingid: data.id});
        }, function (errors) {
            ValidationService.showErrors(form, errors.data)
        });
    };
});