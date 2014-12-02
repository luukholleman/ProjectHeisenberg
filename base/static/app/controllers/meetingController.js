angular.module('punktlichDep').controller('MeetingController', function($scope, $rootScope, MeetingService, MeetingModel){
    $rootScope.$on('timelineViewPortChanged', function(event, from, to){
        MeetingService.getMeetingsForTimeSpan(from, to, function(data){
            $scope.meetings = _.toArray(data);
        }, function(response){
            console.error(response);
        });
    });
});