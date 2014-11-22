angular.module('punktlichDep').controller('TimelineController', function ($scope) {
    //stub

    $scope.generateDate = function(year,month,day) {
        return new Date(year, month -1, day, 0, 0, 0).getTime()/1000;
    }
});
