angular.module('punktlichDep').service('TeamService', function (TeamModel, UserModel, Restangular) {

    function update(team, success, error) {
        team.put().then(success, error);
    };

    function leave(team, user, success, error) {
        TeamModel.one(team.id).one('members', user.id).remove().then(function (data){
            success(data)
        }, function (data) {
            error(data);
        });
    };

    return {
        read: function () {
        },
        update: update,
        create: function () {
        },
        leave: leave,
        get: function (id) {
            return TeamModel.one(id);
        }
    };
});