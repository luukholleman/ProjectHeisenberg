angular.module('punktlichDep').factory('UserModel', function(Restangular, TeamModel){
    Restangular.extendModel('users', function(user){
        user.teams = function(){
            user.getList('teams').then(function(data){
                console.log(data);
            });
        };
        return user;
    });

    return Restangular.service('users');
});
