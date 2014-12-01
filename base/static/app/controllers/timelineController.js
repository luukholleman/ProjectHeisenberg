angular.module('punktlichDep').controller('TimelineController', function ($scope, $timeout, TimelineService) {
    $scope.meetings = [];

    var init = function () {
        document.getElementById('timeline').addEventListener('timeline-request-items', function (event) {
            $scope.getMeetingsForTimeSpan(event.detail.start, event.detail.end);
        });
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
            document.getElementById('timeline').refresh();
        })
    };

    $scope.getMeetingsForTimeSpan = function (from, to) {
        TimelineService.getMeetingsForTimeSpan(from, to, $scope.addMeetings)
    };

    $scope.addMeetings = function (meetings) {
        meetings.forEach(function (meeting) {
            var found = $scope.meetings.filter(function (m) {
                return m.id == meeting.id
            });
            if (found.length == 0) {
                $scope.addMeeting(meeting.id, 'pink', new Date(meeting.date_and_time).getTime() / 1000);
            }
            else {
                found[0].color = 'pink';
                found[0].date = new Date(meeting.date_and_time).getTime() / 1000;
            }
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
