angular.module('punktlichDep').factory('UserModel', function(Restangular, TeamModel){
    return Restangular.service('users');
});
