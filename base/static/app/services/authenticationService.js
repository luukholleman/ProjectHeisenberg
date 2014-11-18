var authenticationService = angular.factory('authenticate', ['$window', function (win) {
    return function (msg) {
        win.alert(msg);
    };
}]);