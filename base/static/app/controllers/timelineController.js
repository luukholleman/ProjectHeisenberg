angular.module('punktlichDep').controller('TimelineController', function ($scope, $timeout, $rootScope, MeetingService) {
    $scope.meetings = [];

    function addMeeting(id, color, date) {
    var init = function () {
        $scope.getMeetingsForTimeSpan($scope.generateDate(2013, 1, 1, 0, 0, 0), $scope.generateDate(2019, 12, 31, 0, 0, 0));

        $scope.addMeeting(0, 'blue', $scope.generateDate(2014, 12, 1, 10, 0, 0));
        $scope.addMeeting(0, 'green', $scope.generateDate(2014, 11, 29 , 0, 0, 0));
        $scope.addMeeting(0, 'yellow', $scope.generateDate(2014, 12, 3, 16, 0, 0));
        $timeout(function () {
            //document.getElementById('timeline').refresh();
        })
    }

    $scope.addMeeting = function (id, color, date) {
        $scope.meetings.push({
            id: id,
            color: color,
            date: date,
            visible: true
        });
        //  Timeout takes care of a callback ofter $apply, this is needed because we want the added meeting to show.
        $timeout(function () {
            //document.getElementById('timeline').refresh();
        })
    }

    function addMeetings(meetings) {
        meetings = _.toArray(meetings);
        meetings.forEach(function (meeting) {
            var found = $scope.meetings.filter(function (m) {
                return m.id == meeting.id
            });
            if (found.length == 0) {
                addMeeting(meeting.id, 'pink', new Date(meeting.date_and_time).getTime() / 1000);
            }
            else {
                found[0].color = 'pink';
                found[0].date = new Date(meeting.date_and_time).getTime() / 1000;
            }
        })
    }

    function getMeetingsForTimeSpan(from, to) {
        $rootScope.$emit('timelineViewPortChanged', from, to);

        MeetingService.getMeetingsForTimeSpan(from, to, addMeetings)
    }

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

    document.getElementById('timeline').addEventListener('timeline-request-items', function (event) {
        getMeetingsForTimeSpan(event.detail.start, event.detail.end);
    });
});
