angular.module('punktlichDep').controller('TimelineController', function ($scope, $window, $timeout, $rootScope, MeetingService) {
    $scope.meetings = [];

    function addMeeting(meeting) {
        meeting.date = new Date(meeting.date_and_time).getTime() / 1000;


        for (var idx = 0; idx < $scope.meetings.length; idx++) {
            if (meeting.date < $scope.meetings[idx].date) {
                $scope.meetings.splice(idx, 0, meeting);
                return;
            }
        }
        $scope.meetings.push(meeting);
    };

    function updateMeeting(oldMeeting, newMeeting) {
        _.forEach(_.toArray(newMeeting), function(key){
            oldMeeting[key] = newMeeting[key];
        });

        oldMeeting.date = new Date(newMeeting.date_and_time).getTime() / 1000;
    };

    function setMeetings(meetings) {
        meetings.forEach(function (meeting) {
            var found = $scope.meetings.filter(function (m) {
                return m.id == meeting.id
            });
            if (found.length == 0) {
                addMeeting(meeting);
            }
            else {
                updateMeeting(found[0], meeting);
            }
        });

        $scope.meetings.filter(function (meeting) {
            return meetings.filter(function (m) {
                    return m.id == meeting.id
                }).length == 0;
        }).forEach(function (meeting) {
            var idx = $scope.meetings.indexOf(meeting);
            $scope.meetings.splice(idx, 1);
        });

        timeline.render();
    }

    function getMeetingsForTimeSpan(from, to) {
        MeetingService.getMeetingsForTimeSpan(from, to, setMeetings);

        $rootScope.$broadcast('timelineViewPortChanged', $scope.meetings);
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

    var timeline = document.getElementById('timeline');
    var pageElement = document.querySelector('#page');

    timeline.addEventListener('timeline-request-nodes', function (event) {
        getMeetingsForTimeSpan(event.detail.start, event.detail.end);
    });

    timeline.addEventListener('node-opened', function (event) {
        var element = document.getElementById('meeting-' + event.detail.node.getAttribute('data-meetingid'));
        element.show();

        var position = element.offsetTop;
        while (element = element.offsetParent) {
            position += element.offsetTop;
        }
        pageElement.scrollTop = position - (timeline.condensed ? 180 : 300);
    });

    $scope.loadMeetingData = function(meeting) {
        meeting.all('invited').getList().then(function(invited) {
            meeting.invited = invited;
        });
        meeting.all('agendas').getList().then(function(agendas) {
            meeting.agendas = agendas;
        });
        meeting.all('minutes').getList().then(function(minutes) {
            meeting.minutes = minutes;
        });
    };

    angular.element(pageElement).bind('scroll', function () {
        if (pageElement.scrollTop > 300 - 170) {
            timeline.condensed = true;
            document.querySelector('.timeline-view').classList.add('condensed');
        } else if (pageElement.scrollTop == 0) {
            timeline.condensed = false;
            document.querySelector('.timeline-view').classList.remove('condensed');
        }
    });

    $scope.$onMany(['meetings.create', 'meetings.update'], function(){
        timeline.refresh();
    })
});
