angular.module('punktlichDep').service('LocalizationService', function ($rootScope, $timeout, $window, $http) {
    var DEFAULT_LOCALE = 'en-us';
    var LOCALE_URL = '/static/app/locale/{0}.json';
    var ALLOW_CACHE = false;

    var defaultLanguage = $window.navigator.userLanguage || $window.navigator.language;
    var dictionary = {};
    var isLoading = false;

    function getAvailableLocalisations() {
        return ['en-us']; //hardcoded for now
    }

    function localize(name) {
        if (!isLoading) {
            loadLocale(defaultLanguage);//for now, load default locale

            return null;
        }

        return dictionary[name] || name;
    }

    function onSuccess(data) {
        dictionary = data;
        $rootScope.$broadcast('localizationResourcesUpdated');
    };

    function loadLocale(key) {
        isLoading = true;
        $http({method: "GET", url: LOCALE_URL.replace('{0}', key), cache: ALLOW_CACHE})
            .success(onSuccess)
            .error(function () {
                console.error('locale', key, 'could not be loaded, falling back to', DEFAULT_LOCALE);
                $http({method: "GET", url: LOCALE_URL.replace('{0}', DEFAULT_LOCALE), cache: ALLOW_CACHE})
                    .success(onSuccess)
                    .error(function () {
                        console.error('Failed to load default localization. Falling back to keys');
                        onSuccess({});
                    });
            });
    }

    return {
        getAvailableLocalisations: getAvailableLocalisations,
        localize: localize,
        loadLocale: loadLocale
    };

}).filter('localize', function () {
    return function (input, service) {
        return service.localize(input)
    };
});