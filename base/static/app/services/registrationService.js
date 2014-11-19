angular.module('punktlichDep').factory('RegistrationService', function (UserModel) {
    function register(userData, success, error) {
        var user = new UserModel(userData);

        user.username = user.first_name + user.last_name;//@TODO: remove this

        user.$save(function () {
            success();
        }, function (response) {
            error(response.data);
        });
    }

    return {
        register: register
    }
});