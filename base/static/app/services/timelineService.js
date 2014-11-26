angular.module('punktlichDep').factory('TimelineService', function ($http) {
    function getMeetingsForTimeSpan(from, to, callback) {
        $http.get(apiBase + 'meeting', {
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
