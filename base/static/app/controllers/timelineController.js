angular.module('punktlichDep').controller('TimelineController', function ($scope) {
    //stub

    $scope.generateDate = function(year,month,day, h, m, s) {
        return new Date(year, month -1, day, h,m,s).getTime()/1000;
    }
});
