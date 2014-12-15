angular.module('punktlichDep').factory('MeetingModel', function(Restangular){
    return Restangular.service('meetings');
});
