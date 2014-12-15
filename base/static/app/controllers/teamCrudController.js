angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, TeamService, Restangular, $stateParams, TeamModel, AuthenticationService, ValidationService) {
    TeamService.get($stateParams.id).get().then(function (data) {
        $scope.team = data;
        getMembers();
    });

    $scope.save = function (form) {
        TeamService.update($scope.team, function () {
        }, function (errors) {
            //ValidationService.showErrors(form, errors.data)
        });
    };

    $scope.leave = function () {
        AuthenticationService.leaveTeam($scope.team, function () {
        }, function (errors) {
            //ValidationService.showErrors(null, errors.data)
        })
    };

    var getMembers = function () {
        $scope.members = $scope.team.getList('members').$object;
    };
});