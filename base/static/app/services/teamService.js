angular.module('punktlichDep').service('TeamService', function (TeamModel, UserModel, Restangular) {
    Restangular.extendModel('teams', function (team) {
        //@todo maybe we should create somehing generic to parse dates
        team.created_on_moment = moment(new Date(team.created_on));
        return team;
    });

    function update(team, success, error) {
        team.put().then(success, error);
    }

    return {
        read: function () {
        },
        update: update,
        create: function () {
        },
        get: function (id) {
            return TeamModel.one(id);
        }
    };
});