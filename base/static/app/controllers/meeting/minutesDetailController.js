angular.module('punktlichDep').controller('MinutesDetailController', function ($scope, $window) {
    $scope.download = function(path) {
        $window.open(path);
    };

    $scope.saveFilename = function(name) {
        $scope.minutes[0].patch({file_name: name});
    };
});