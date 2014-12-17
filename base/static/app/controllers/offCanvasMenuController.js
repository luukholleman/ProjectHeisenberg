angular.module('punktlichDep').controller('OffCanvasMenuController', function ($scope, $rootScope, FlashMessageService, TeamModel) {

    function loadTeams() {
        TeamModel.getList().then(function(teams){
            $scope.teams = teams;
        }, function(error){
        });
    }

    loadTeams();

    $scope.$on('teams.update', function(){
        loadTeams();
    });
});
