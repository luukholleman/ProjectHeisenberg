angular.module('punktlichDep').filter('humanReadableDate', function () {
    return function (date, startText) {
        if(!date) {return null;}

        var m = moment(date instanceof Date ? date : new Date(date));
        return (startText ? (m.future ? 'Starts in ' : 'Started ') : '') + m.fromNow();
    };
});