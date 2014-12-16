angular.module('punktlichDep').controller('ActivationController', function ($scope, $state, $routeParams, $http, FlashMessageService) {
    var token = $routeParams.token;

    if (token == null) {
        $state.go('login');
        return;
    }

    $http.post('/api/v1/users/activate/', {activation_token: token}).success(function() {
        $state.go('login');
        FlashMessageService.setMessage('Your account was activated successfully! You can now login!');
    }).error(function() {
        FlashMessageService.setMessage('Your account could not be activated');
    });

});