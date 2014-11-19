angular.module('punktlichDep').factory('RegistrationService', function (UserModel) {
    function register(userData, success, error) {
        var user = new UserModel(userData);
        user.$save(function() {
            success();
        }, function(response) {
            error(response.data);
        });
    }

    return {
        register: register
    }
});