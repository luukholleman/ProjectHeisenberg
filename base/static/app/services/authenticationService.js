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

    function setToken(token)
    {
        $http.defaults.headers.common['Authorization'] = 'Token ' + token;
    }

    return{
        login: login,
        setToken: setToken
    };
});
