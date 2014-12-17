angular.module('punktlichDep').service('LocalizationService', function ($q, $rootScope, $timeout, $window, $http) {
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
        return isLoaded ? (dictionary[name] || name) : name;
    }

    function load() {
        return loadLocale(defaultLanguage);//for now, load default locale
    }

    function loadLocale(key) {
        isLoading = true;

        return $q(function(resolve) {
            function onSuccess(data) {
                dictionary = data;
                isLoaded = true;
                isLoading = false;

                resolve();
            };

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
        });

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