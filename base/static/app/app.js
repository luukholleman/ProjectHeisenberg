var appPath = '/static/app/';
var apiBase = '/api/v1/';

angular.module('punktlich', ['punktlichDep']);

angular.module('punktlich').config(function ($httpProvider, $locationProvider, RestangularProvider, cfpLoadingBarProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    RestangularProvider.setBaseUrl('api/v1/');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.loadingBarTemplate = "<paper-spinner active class='spinner'></paper-spinner>";

    $httpProvider.interceptors.push('AccessInterceptor');
});

angular.module('punktlichDep', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'restangular',
    'angular-loading-bar'
]);
