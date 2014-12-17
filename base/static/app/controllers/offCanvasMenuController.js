angular.module('punktlichDep').controller('OffCanvasMenuController', function (ColorService, $scope, $rootScope, FlashMessageService, TeamModel) {

    function loadTeams() {
        ColorService.loadColors();
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
