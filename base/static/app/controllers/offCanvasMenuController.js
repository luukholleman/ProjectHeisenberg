angular.module('punktlichDep').controller('OffCanvasMenuController', function ($scope, $rootScope) {
    function setTeams() {
        $rootScope.user.getTeams(function(teams){

            $scope.user.teams = teams;

            // get every teams color and place it in team.color
            _.forEach($scope.user.teams, function(team){
                team.getColor(function(data){
                    team.color = data.color
                });
            });
        });
    }

    $scope.$watch('user', function(){
        if($scope.user == undefined)
            return;

        setTeams();
    });

    $scope.$on('teams.update', function(){
        setTeams();
    });
});