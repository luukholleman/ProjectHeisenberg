angular.module('punktlichDep').controller('OffCanvasMenuController', function ($scope, $rootScope, FlashMessageService, TeamModel) {
    function loadTeams() {
        TeamModel.getList().then(function(teams){
            _.forEach(teams, function(team){
                team.getColor(function(color){
                    team.color = color.color

                    console.log(team);
                });
            });

            $scope.teams = teams;

            console.log($scope.teams);
        }, function(error){
        });
    }

    loadTeams();

    $scope.$on('teams.update', function(){
        loadTeams();
    });
});
