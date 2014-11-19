angular.module('punktlichDep').factory('AuthenticationService', function (UserModel) {
    function login(email, password) {
        var user = UserModel.get({email: email, password: password});
    }

    return{
        login: login
    };
});
