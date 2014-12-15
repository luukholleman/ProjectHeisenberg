angular.module('punktlichDep').factory('UserModel', function(Restangular){
    return Restangular.service('users');
});
