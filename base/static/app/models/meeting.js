angular.module('punktlichDep').factory('MeetingModel', function ($resource) {
    return $resource(apiBase + 'meeting?:from:to');
});
