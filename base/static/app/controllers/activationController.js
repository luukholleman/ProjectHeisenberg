angular.module('punktlichDep').controller('ActivationController', function ($scope, $state, $stateParams, $http, FlashMessageService) {
    var token = $stateParams.token;

    if (token == null) {
        $state.go('punktlich.login');
        return;
    }

    $http.post('/api/v1/users/activate/', {activation_token: token}).success(function() {
        $state.go('punktlich.login');
        FlashMessageService.setMessage('Your account was activated successfully! You can now login!');
    }).error(function() {
        $state.go('punktlich.login');
        FlashMessageService.setMessage('Your account could not be activated');
    });

});