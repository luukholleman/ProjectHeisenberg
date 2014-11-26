angular.module('punktlichDep').factory('TimelineService', function ($http) {
    function getMeetingsForTimeSpan(from, to, callback) {
        $http.get(apiBase + 'meetings?from=2013-01-01%2000:00:00.00000&to=2019-12-31%2000:00:00.00000', {
            from: from,
            to: to
        }).success(function (data) {
            callback(data);
        }).error(function (response) {
            console.error(response);
        });
    }

    return{
        getMeetingsForTimeSpan: getMeetingsForTimeSpan
    };
});
