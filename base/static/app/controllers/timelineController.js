angular.module('punktlichDep').controller('TimelineController', function ($scope) {
    $scope.meetings = [];

    $scope.addMeeting = function (color, date) {
        $scope.meetings.push({
            color: color,
            date: date,
            visible: true
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
});
