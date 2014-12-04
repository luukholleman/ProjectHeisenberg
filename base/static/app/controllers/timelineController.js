angular.module('punktlichDep').controller('TimelineController', function ($scope, $window, $timeout, $rootScope, MeetingService) {
    $scope.meetings = [];

    function addMeeting(id, color, date) {
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
    };

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

    var el = document.querySelector('#page');

    var raw = angular.element(el);

    raw.bind('scroll', function () {
        if(el.scrollTop > 300 - 170) {
            document.getElementById('timeline').condensed = true;
                document.querySelector('.timeline-view').classList.add('condensed')
        } else if(el.scrollTop == 0) {
            document.getElementById('timeline').condensed = false;
            document.querySelector('.timeline-view').classList.remove('condensed')
        }

        console.log('in scroll', el, [el], el.scrollTop , el.scrollHeight);
    });
});
