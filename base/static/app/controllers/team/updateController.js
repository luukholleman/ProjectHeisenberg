angular.module('punktlichDep').controller('TeamUpdateController', function ($scope, $rootScope, TeamService, Restangular, $stateParams, ValidationService, FlashMessageService) {
    function fetchTeam() {
        TeamService.get($stateParams.teamid).get().then(function (data) {
            $scope.team = data;
            getMembers();
        });
    };

    fetchTeam();

    $scope.destroy = function () {
        document.querySelector('.core-overlay-backdrop').style.display = 'none';
        document.querySelector('core-overlay-layer').style.display = 'none';
        TeamService.destroy($scope.team, function () {
            $rootScope.$broadcast('teams.destroy', $scope.team);
            FlashMessageService.setMessage('You\'ve deleted ' + $scope.team.name);
        }, function (errors) {
            //ValidationService.showErrors(null, errors.data)
        });
        $rootScope.goto('meetings.list');
    };

    $scope.invite = function () {
        TeamService.invite($scope.team, $scope.email, function () {
            $rootScope.$broadcast('teams.members.invited', $scope.email);
            FlashMessageService.setMessage($scope.email + ' is invited to ' + $scope.team.name + '.');
            fetchTeam();
        }, function () {
            FlashMessageService.setMessage($scope.email + ' could not be invited to ' + $scope.team.name + '.');
        });
    };

    $scope.leave = function () {
        TeamService.leave($scope.team, $rootScope.user, function () {
            $rootScope.$broadcast('teams.members.leave', $rootScope.user);
            FlashMessageService.setMessage('You\'ve left ' + $scope.team.name);
        }, function (errors) {
            //ValidationService.showErrors(null, errors.data)
        });
        $rootScope.goto('meetings.list');
    };

    $scope.save = function () {
        TeamService.update($scope.team, function () {
            $rootScope.$broadcast('teams.update', $scope.team);
        }, function (errors) {
            //ValidationService.showErrors(form, errors.data)
        });
    };

    $scope.toggleDialog = function (id) {
        document.getElementById(id).toggle();
    };

    var getMembers = function () {
        $scope.members = $scope.team.getList('members').$object;
    };
});