angular.module('punktlichDep').controller('OffCanvasMenuController', function ($scope, $rootScope, FlashMessageService, TeamModel) {
    function loadTeams() {
        TeamModel.getList().then(function(data){
            $scope.teams = data;

            _.forEach($scope.teams, function(team){
                team.getColor(function(data){
                    team.color = data.color
                });
            });
        }, function(error){
            FlashMessageService.setMessage(error);
        });
    }

    loadTeams();

    $scope.$on('teams.update', function(){
        loadTeams();
    });
});
