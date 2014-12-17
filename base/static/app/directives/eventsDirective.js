angular.module('punktlichDep').directive('plEvents', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        compile: function ($element, attrs) {
            return function ngEventHandler(scope, element) {
                attrs['plEvents'].split(' ').forEach(function (eventName) {
                    var directive = attrs.$normalize('on-' + eventName);
                    var fn = $parse(attrs[directive], null, true);

                    element.on(eventName, function (event) {
                        var callback = function () {
                            fn(scope, {$event: event});
                        };
                        if ($rootScope.$$phase) {
                            scope.$evalAsync(callback);
                        } else {
                            scope.$apply(callback);
                        }
                    });
                });
            };
        }
    };
});