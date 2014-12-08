angular.module('punktlichDep').controller('TimelineController', function ($scope, $window, $timeout, $rootScope, MeetingService) {
    $scope.meetings = [];

    function addMeeting(meeting) {
        meeting.color = 'pink';
        meeting.date = new Date(meeting.date_and_time).getTime() / 1000;

        $scope.meetings.push(meeting);

        console.log('adding meeting', meeting);
        //  Timeout takes care of a callback ofter $apply, this is needed because we want the added meeting to show.
        $timeout(function () {
            //document.getElementById('timeline').refresh();
        });
    };

    function updateMeeting(meeting) {
        meeting.color = 'pink';
        meeting.date = new Date(meeting.date_and_time).getTime() / 1000;
    };

    function addMeetings(meetings) {
        //meetings = _.toArray(meetings);
        meetings.forEach(function (meeting) {
            var found = $scope.meetings.filter(function (m) {
                return m.id == meeting.id
            });
            if (found.length == 0) {
                addMeeting(meeting);
            }
            else {
                updateMeeting(found[0]);
            }
        })
    }

    function getMeetingsForTimeSpan(from, to) {
        MeetingService.getMeetingsForTimeSpan(from, to, addMeetings);

        $rootScope.$emit('timelineViewPortChanged', $scope.meetings);
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

    document.getElementById('timeline').addEventListener('timeline-request-nodes', function (event) {
        getMeetingsForTimeSpan(event.detail.start, event.detail.end);
    });

    var el = document.querySelector('#page');
    var raw = angular.element(el);
    raw.bind('scroll', function () {
        if (el.scrollTop > 300 - 170) {
            document.getElementById('timeline').condensed = true;
            document.querySelector('.timeline-view').classList.add('condensed')
        } else if (el.scrollTop == 0) {
            document.getElementById('timeline').condensed = false;
            document.querySelector('.timeline-view').classList.remove('condensed')
        }
    });
});
