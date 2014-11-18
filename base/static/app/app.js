var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem('authorization-token');
}]);

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource'
]);
