angular.module('punktlichDep').controller('TimelineController', function ($scope, $timeout, $rootScope, MeetingService) {
    $scope.meetings = [];

    function addMeeting(meeting) {
        meeting.moment = moment(new Date(meeting.date_and_time));
        meeting.future = function() {
            return this.moment.isAfter(moment());
        }
        console.log(meeting, meeting.human_readable_time);
        $scope.meetings.push(meeting);
        //  Timeout takes care of a callback ofter $apply, this is needed because we want the added meeting to show.
        $timeout(function () {
            document.getElementById('timeline').refresh();
        })
    }
    function updateMeeting(meeting) {
        meeting.color = 'pink';
        meeting.date = new Date(meeting.date_and_time).getTime() / 1000;
    }


    function addMeetings(meetings) {
        meetings = _.toArray(meetings);
        meetings.forEach(function (meeting) {
            var found = $scope.meetings.filter(function (m) {
                return m.id == meeting.id
            });
            if (found.length == 0) {
                addMeeting(meeting);
            } else {
                updateMeeting(found[0]);
            }
        });
        $rootScope.$emit('timelineViewPortChanged', $scope.meetings);
    }

    function getMeetingsForTimeSpan(from, to) {


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
