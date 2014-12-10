angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, TeamService, Restangular, $stateParams, ValidationService) {
    TeamService.get($stateParams.id).get().then(function (data) {
        $scope.team = data;
    });

    $scope.save = function (form) {

    };
});