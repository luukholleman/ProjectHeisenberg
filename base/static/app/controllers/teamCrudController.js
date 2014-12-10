angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, TeamService, Restangular, $stateParams, ValidationService) {
    TeamService.get($stateParams.id).get().then(function (data) {
        $scope.team = data;
        console.log($scope.team.getMembers());
    });

    $scope.save = function (form) {

    };
});