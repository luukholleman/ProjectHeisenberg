angular.module('punktlichDep').factory('AuthenticationService', function ($window) {
    return function (msg) {
        $window.alert(msg);
    };
});
