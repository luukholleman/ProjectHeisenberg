angular.module('punktlichDep').controller('MeetingListController', function($scope, $rootScope){
    $rootScope.$on('timelineViewPortChanged', function(event, meetings){
        $scope.meetings = meetings;
    });
});