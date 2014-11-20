angular.module('punktlichDep').controller('MainController', function ($scope, FlashMessageService, $location) {
    $scope.flash = FlashMessageService;

    $scope.goto = function (route) {
        $location.path(route);
    }
});
