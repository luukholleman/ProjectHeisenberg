angular.module('punktlichDep').directive('ngFile', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        compile: function ($element, attrs) {
            return function ngEventHandler(scope, element) {
                var fn = $parse(attrs['ngFile'], null, true);
                element[0].onchange = function (event) {
                    if (event.files = element[0].files) {
                        var callback = function () {
                            fn(scope, {$event: event});
                        };
                        if ($rootScope.$$phase) {
                            scope.$evalAsync(callback);
                        } else {
                            scope.$apply(callback);
                        }
                    }
                };
            };
        }
    };
});