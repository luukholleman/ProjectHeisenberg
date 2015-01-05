angular.module('punktlichDep').controller('FileDetailController', function ($scope, $window) {
    $scope.download = function(path) {
        $window.open(path);
    };
});