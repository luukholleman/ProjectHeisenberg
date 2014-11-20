angular.module('punktlichDep').controller('ActivationController', function ($scope, $location, $routeParams, $http) {
    var token = $routeParams.token;

    if (token == null) {
        $location.path('/login');
        return;
    }

    $http.post('/api/v1/users/activate/', {activation_token: token}).success(function(data, status, headers) {
        $location.path('/login');
        $scope.flash.setMessage('Your account was activated successfully! You can now login!');
    }).error(function(data, status, headres) {
        $scope.flash.setMessage('Your account could not be activated');
    });

});