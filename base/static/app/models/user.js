angular.module('punktlichDep').factory('UserModel', function(Restangular, TeamModel){
    Restangular.extendModel('users', function(user){
        return user;
    });

    return Restangular.service('users');
});
