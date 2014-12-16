angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, $rootScope, TeamService, Restangular, $stateParams, TeamModel, AuthenticationService, ValidationService) {
    TeamService.get($stateParams.teamid).get().then(function (data) {
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
        TeamService.leave($scope.team, $rootScope.user, function () {
        }, function (errors) {
            //ValidationService.showErrors(null, errors.data)
        });
    };

    var getMembers = function () {
        $scope.members = $scope.team.getList('members').$object;
    };
});