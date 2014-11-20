angular.module('punktlichDep').controller('ActivationController', function ($scope, $location, $routeParams, $http) {
    var token = $routeParams.token;

    if (token == null) {
        $location.path('/login');
        return;
    }

    $http.post('/api/v1/users/activate/', {activation_token: token}).success(function(data, status, headers) {
        $location.path('/login')
    }).error(function(data, status, headres) {
        // @todo show toast with error
    });

});