angular.module('punktlichDep').factory('UserModel', function(Restangular, TeamModel){
    Restangular.extendModel('users', function(user){

        user.getTeams = function(success, error){
            TeamModel.getList({ids: user.teams.join()}).then(success, error);
        };

        return user;
    });

    return Restangular.service('users');
});
