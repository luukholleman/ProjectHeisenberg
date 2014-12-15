angular.module('punktlichDep').factory('AuthenticationService', function ($http) {
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
    }

    function setToken(token) {
        localStorage.setItem('authentication-token', token);
        $http.defaults.headers.common['Authorization'] = 'Token ' + token;
    }

    function resetToken() {
        localStorage.removeItem('authentication-token');
        delete $http.defaults.headers.common['Authorization'];
    }

    return {
        login: login,
        setToken: setToken,
        resetToken: resetToken
    };
});
