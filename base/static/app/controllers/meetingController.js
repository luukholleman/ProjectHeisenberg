angular.module('punktlichDep').controller('MeetingController', function($scope, $rootScope, MeetingService, MeetingModel){
    $rootScope.$on('timelineViewPortChanged', function(event, meetings){
        $scope.meetings = meetings;
    });
});