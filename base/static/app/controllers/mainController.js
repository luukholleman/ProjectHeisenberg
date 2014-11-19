angular.module('punktlichDep').controller('MainController', function ($scope, FlashMessageService) {
    $scope.flash = FlashMessageService;
});
