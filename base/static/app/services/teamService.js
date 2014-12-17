angular.module('punktlichDep').service('TeamService', function (TeamModel, UserModel, Restangular) {

    function destroy(team, success, error) {
        TeamModel.one(team.id).remove().then(function (data){
            success(data)
        }, function (data) {
            error(data);
        });
    };

    function leave(team, user, success, error) {
        TeamModel.one(team.id).one('members', user.id).remove().then(function (data){
            success(data)
        }, function (data) {
            error(data);
        });
    };

    function update(team, success, error) {
        team.put().then(success, error);
    };

    return {
        create: function () {
        },
        destroy: destroy,
        get: function (id) {
            return TeamModel.one(id);
        },
        leave: leave,
        read: function () {
        },
        update: update
    };
});