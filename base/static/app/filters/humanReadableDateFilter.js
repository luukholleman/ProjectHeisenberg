angular.module('punktlichDep').filter('humanReadableDate', function () {
    return function (date) {
        return date ? moment(date instanceof Date ? date : new Date(date)).fromNow() : null;
    };
});