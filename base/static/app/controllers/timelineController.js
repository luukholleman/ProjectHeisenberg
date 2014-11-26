angular.module('punktlichDep').controller('TimelineController', function ($scope, $timeout, TimelineService) {
    $scope.meetings = [];

    var init = function () {
        $scope.addMeeting('punktlich', $scope.generateDate(2014, 12, 1, 10, 0, 0));
        $scope.addMeeting('green', $scope.generateDate(2014, 11, 27, 0, 0, 0));
        $scope.addMeeting('pink', $scope.generateDate(2014, 11, 26, 10, 5, 0));
        $scope.addMeeting('yellow', $scope.generateDate(2014, 12, 3, 16, 0, 0));
        $scope.addMeeting('red', $scope.generateDate(2014, 12, 5, 20, 0, 0));
        $timeout(function () {
            document.getElementById('timeline').refresh();
        })
    }

    $scope.addMeeting = function (color, date) {
        $scope.meetings.push({
//            id: id,
            color: color,
            date: date,
            visible: true
        });
        //  Timeout takes care of a callback ofter $apply, this is needed because we want the added meeting to show.
        $timeout(function () {
            document.getElementById('timeline').refresh();
        })
    };

    $scope.getMeetingsForTimeSpan = function (from, to) {
        TimelineService.getMeetingsForTimeSpan(from, to, $scope.addMeetings)
    };

    $scope.addMeetings = function (meetings){
        meetings.forEach(function(meeting){
            $scope.addMeeting(meeting.color, meeting.date);
        })
    };

    $scope.toggleGroupVisible = function (color) {
        $scope.meetings.filter(function (e) {
            return e.color == color;
        }).forEach(function (e) {
            e.visible = false;
        });
    };

    $scope.generateDate = function (year, month, day, h, m, s) {
        return new Date(year, month - 1, day, h, m, s).getTime() / 1000;
    };

    init();
});
