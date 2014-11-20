var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(['$httpProvider', function ($httpProvider, AuthenticationService) {

    var authToken = localStorage.getItem('authentication-token');
    if (authToken != null) {
        AuthenticationService.setToken(authToken);
    }

}]);

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource'
]);
