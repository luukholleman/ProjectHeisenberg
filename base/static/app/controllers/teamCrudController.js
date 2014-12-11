angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, TeamService, Restangular, $stateParams, TeamModel) {
    TeamService.get($stateParams.id).get().then(function (data) {
        $scope.team = data;
        $scope.team.getMembers(function(members) {
            $scope.members = members;
        });
    });

    $scope.save = function (form) {
        TeamService.update($scope.team, function() {
        }, function (errors){
            ValidationService.showErrors(form, errors.data)
        });
    };
});