angular.module('punktlichDep').factory('AuthenticationService', function ($http) {
    function login(email, password) {
        $http.post(apiBase + 'login', {
            email: email,
            password: password
        }).success(function (data) {
            setToken(data.token);

            location.path = '/'
        }).error(function () {
            //@todo error messages toasten
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
