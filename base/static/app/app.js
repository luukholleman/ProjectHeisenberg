var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(['$httpProvider', function ($httpProvider) {
    var authToken = localStorage.getItem('authorization-token');
    if (authToken != null)
        $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + token;
}]);

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource'
]);
