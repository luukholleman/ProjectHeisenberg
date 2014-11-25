var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(function ($httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource',
    'ui.router'
]);
