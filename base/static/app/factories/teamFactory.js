angular.module('punktlichDep').factory('TeamModel', function(Restangular){
    return Restangular.service('teams');
});