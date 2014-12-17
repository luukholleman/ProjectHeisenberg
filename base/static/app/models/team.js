angular.module('punktlichDep').factory('TeamModel', function(Restangular) {

    Restangular.extendModel('teams', function(team){

        return team;
    });

    return Restangular.service('teams');
});
