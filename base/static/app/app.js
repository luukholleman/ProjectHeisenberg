var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider, AuthenticationService) {

    var authToken = localStorage.getItem('authentication-token');
    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    }

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource'
]);
