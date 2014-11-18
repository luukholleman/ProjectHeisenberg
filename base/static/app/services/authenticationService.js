angular.module('punktlichDep').service('authenticationService', function (window) {
    return function (msg) {
        window.alert(msg);
    };
});
