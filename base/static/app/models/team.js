angular.module('punktlichDep').factory('TeamModel', function(Restangular, ColorService) {

    Restangular.extendModel('teams', function(team){

        return team;
    });

    return Restangular.service('teams');
});
