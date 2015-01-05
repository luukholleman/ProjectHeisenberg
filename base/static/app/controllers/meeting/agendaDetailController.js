angular.module('punktlichDep').controller('AgendaDetailController', function ($scope, $window) {
    $scope.download = function(path) {
        $window.open(path);
    };

    $scope.saveFilename = function(name) {
        $scope.agendas[0].patch({file_name: name});
    };
});