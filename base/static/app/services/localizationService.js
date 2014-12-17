angular.module('punktlichDep').service('LocalizationService', function ($rootScope, $timeout, $window, $http) {
    var DEFAULT_LOCALE = 'en-us';
    var LOCALE_URL = '/static/app/locale/{0}.json';
    var ALLOW_CACHE = false;

    var defaultLanguage = $window.navigator.userLanguage || $window.navigator.language;
    var dictionary = {};
    var isLoading = false;
    var isLoaded = false;

    function getAvailableLocalisations() {
        return {
            'en-us': 'English(US)'
        };
    }

    function localize(name) {
        if (!isLoading && !isLoaded) {
            loadLocale(defaultLanguage);//for now, load default locale
        }

        return isLoaded ? (dictionary[name] || name) : null;
    }

    function load() {
        return loadLocale(defaultLanguage);//for now, load default locale
    }

    function onSuccess(data) {
        dictionary = data;
        isLoaded = true;
        isLoading = false;

        $rootScope.$emit('localizationResourcesUpdated');
    };

    function loadLocale(key) {
        isLoading = true;

        return $http({method: "GET", url: LOCALE_URL.replace('{0}', key), cache: ALLOW_CACHE})
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
        loadLocale: loadLocale,
        load: load
    };

}).filter('localize', function (LocalizationService) {
    return function (input) {
        return LocalizationService.localize(input)
    };
}).filter('l', function ($filter) {
    return function (input) {
        return $filter('localize')(input);
    }
})