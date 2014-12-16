angular.module('punktlichDep').factory('TeamModel', function(Restangular) {
    Restangular.extendModel('teams', function(team){

        var colors = [];

        team.getList('colors').then(function(color) {
            colors.colors = color;
        });

        team.getColor = function(success, error){
            team.one('color').get().then(success, error);
        };

        return team;
    });

    return Restangular.service('teams');
});
