angular.module('punktlichDep').filter('limit', function () {
    return function (input, length) {
        return input && input.length > length ? input.substr(0, length) + '...' : input;
    };
});