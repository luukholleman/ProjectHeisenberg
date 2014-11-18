angular.module('punktlichDep').factory('RegistrationService', function (UserModel) {

    function register(firstname, lastname, email, password, passwordRepeat) {
        var user = UserModel.get({id:1});
    }

    return {
        register: register
    }
});