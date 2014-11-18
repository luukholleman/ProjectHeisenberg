angular.module('punktlichDep').factory('AuthenticationService', function ($window) {
    function login(email, password) {
        $window.alert(email +' '+password);
    }

    return{
        login: login
    };
});
