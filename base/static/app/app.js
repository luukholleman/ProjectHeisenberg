var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(function ($httpProvider, $locationProvider, RestangularProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    RestangularProvider.setBaseUrl('api/v1/');
});

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'restangular'
]);
