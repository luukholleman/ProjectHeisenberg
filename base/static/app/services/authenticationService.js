angular.module('punktlichDep').factory('AuthenticationService', function ($rootScope, $http, UserModel) {
    function login(email, password, success, error) {
        $http.post(apiBase + 'login', {
            email: email,
            password: password
        }).success(function (data) {
            setToken(data.token);
            success();
        }).error(function (response) {
            error(response);
        });
    };

    function setToken(token) {
        localStorage.setItem('authentication-token', token);
        $http.defaults.headers.common['Authorization'] = 'Token ' + token;
    };

    function getAuthenticatedUser(success, error) {
        UserModel.one().customGET('authenticated').then(function (user) {
            success(user)
        }, function (data) {
            error(data);
        });
    };

    function leaveTeam(team, success, error) {
        $rootScope.user.one('teams', team.id).remove().then(function (user) {
            success(user)
        }, function (data) {
            error(data);
        });
    };

    function resetToken() {
        localStorage.removeItem('authentication-token');
        delete $http.defaults.headers.common['Authorization'];
    };

    return {
        login: login,
        setToken: setToken,
        resetToken: resetToken,
        getAuthenticatedUser: getAuthenticatedUser,
        leaveTeam: leaveTeam
    };
});
